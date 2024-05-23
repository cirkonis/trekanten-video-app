'use client'

import React, { useEffect, useState } from "react";
import {getFencers} from "@/lib/firestore/fencers/getFencers";
import {Fencer} from "@/types/fencer";
import {CreateFencer} from "@/components/CreateFencer";
import Link from "next/link";

export default function FencersTable() {
    const [fencers, setFencers] = useState<Fencer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFencers = async () => {
        setLoading(true); // Set loading to true before starting the fetch
        try {
            const fencersData = await getFencers();
            setFencers(fencersData);
            setError(null); // Clear any previous errors
        } catch (error) {
            setError("Failed to fetch fencers");
        } finally {
            setLoading(false); // Set loading to false after the fetch completes
        }
    };

    useEffect(() => {
        fetchFencers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bg-ct-blue-600 min-h-screen p-6">
            <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl mb-6 text-left">Fencers</h1>
             <div className="flex items-center">
                <CreateFencer onCreate={fetchFencers} />
                <button className="btn btn-accent ml-6" onClick={fetchFencers}>
                    Re Fetch Fencers
                </button>
             </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>YouTube Playlist</th>
                        <th>Finished Videos</th>
                        <th>Fencer Data</th>
                    </tr>
                    </thead>
                    <tbody>
                    {fencers.map((fencer) => (
                        <tr key={fencer.id}>
                            <td>{fencer.name}</td>
                            <td>
                                <a className="link-accent" href={`https://www.youtube.com/playlist?list=${fencer.playlistId}`} target="_blank">View
                                    on YouTube 📺</a>
                            </td>
                            <td className="text-gray-400">
                                <Link href={``}>
                                    View Finished Videos
                                </Link>
                            </td>
                            <td className="text-gray-400">
                                <Link href={``}>
                                    View Fencer Data
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
