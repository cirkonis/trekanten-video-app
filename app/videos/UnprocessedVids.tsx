'use client'

import {useEffect, useState} from "react";
import {useUserStore} from "@/state/usersState";

export default function UnprocessedVids() {
    const [unprocessedVideos, setUnprocessedVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const getUnprocessedVideos = async () => {
        const accessToken = useUserStore.getState().token;

        try {
            if (accessToken === null) {
                throw new Error('No access token found, Sign in to access this page');
            }


            const playlistId = 'PLgDEtyTQ47rJAh0vMOchK4tNAxmf4wbGM';

            const res = await fetch(`/api/tube/playlist?id=${playlistId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            })

            if (!res.ok) {
                throw new Error('Failed to fetch unprocessed videos');
            }

            const data = await res.json();
            // Extracting only required properties
            const formattedData = data.data.items.map((item: { snippet: any }) => ({
                videoId: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                publishedAt: item.snippet.publishedAt,
                thumbnail: item.snippet.thumbnails.default.url,
            }));
            setUnprocessedVideos(formattedData);

        } catch (error) {
            console.error("Error getting unprocessed videos:", error);
        } finally {
            return true;
        }

    }


    useEffect(() => {
        getUnprocessedVideos().then(r => setLoading(false));
    }, []);


    return (
        <div>
            {loading && <div>Loading...</div>}
            <div>
                <h1>Unprocessed Videos</h1>
                {unprocessedVideos ? (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Video ID</th>
                                <th>Published At</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {unprocessedVideos.map(video => (
                                <tr key={video.videoId}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={video.thumbnail} alt="Thumbnail"/>
                                                </div>
                                            </div>
                                            <div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{video.title}</td>
                                    <td>
                                        <a className="link accent" href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank">View on YouTube 📺</a>
                                    </td>
                                    <td>{new Date(video.publishedAt).toLocaleString()}</td>
                                    <td>
                                        <button className="btn btn-secondary">Get to work 🤺</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>No unprocessed videos found.</div>
                )}
            </div>
        </div>
    );
};

