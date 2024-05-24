
import React, { useEffect, useState} from "react";
import {useUserStore} from "@/state/usersState";
import {useVideoStore} from "@/state/videoState";
import Link from "next/link";
import {AlertMessage} from "@/components/AlertMessage";


export default function UnprocessedVids() {
    const [unprocessedVideos, setUnprocessedVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [showAlert, setShowAlert] = useState(false);


    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const getUnprocessedVideos = async () => {
        setLoading(true);
        try {
            const token = useUserStore.getState().token;
            if (!token) {
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
                throw new Error('User is not logged in');
            }

            const playlistId = 'PLgDEtyTQ47rJAh0vMOchK4tNAxmf4wbGM';

            const res = await fetch(`/api/tube/playlist?id=${playlistId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
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
            setLoading(false);

        } catch (error) {
            console.error("Error getting unprocessed videos:", error);
        } finally {
            return true;
        }

    }


    useEffect(() => {
        getUnprocessedVideos().then(r => setLoading(false));
    }, []);


    function handleGetToWork(videoTitle: string, videoId: string) {
            return () => {
                setDisabled(true);
                useVideoStore.getState().setYouTubeVideoId(videoId);
                useVideoStore.getState().setTitle(videoTitle);

                const modal = document.getElementById('confirm-modal');
                if (modal) {
                    // @ts-ignore
                    modal.showModal();
                }
            }
    }

    return (
        <div>
            {loading && <div>Loading...</div>}
            <div>
                {unprocessedVideos ? (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Video ID</th>
                                <th>Published At</th>
                                <th>
                                    <button className="btn btn-accent" onClick={getUnprocessedVideos}>
                                        Re Fetch Videos
                                    </button>
                                </th>
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
                                        <a className="link-accent" href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank">View
                                            on YouTube 📺</a>
                                    </td>
                                    <td>{new Date(video.publishedAt).toLocaleString()}</td>
                                    <td>
                                        <button disabled={disabled} onClick={handleGetToWork(video.title, video.videoId)} className="btn btn-primary">
                                           Get to work 🤺
                                        </button>
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
            <div>
                {showAlert && <AlertMessage alertMessage="Not logged in!" onClose={handleCloseAlert}/>}
            </div>
            <dialog id="confirm-modal" className="modal">
                <div className="modal-box flex flex-col w-full">
                    <h3 className="font-bold text-lg">Ready to fix this up</h3>
                    <div className="py-4">
                        <span className="">{useVideoStore.getState().title} </span>
                    </div>
                    <div className="modal-action flex w-full justify-between">
                        <form method="dialog">
                            <button className="btn btn-danger">Changed my mind 🙅</button>
                        </form>
                        <Link className="btn btn-accent" href="/annotate-video">
                            let's do it! 🤺
                        </Link>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

