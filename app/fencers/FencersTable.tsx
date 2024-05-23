'use client'

import { useEffect, useState } from "react";
import {getFencers} from "@/lib/firestore/fencers/getFencers";
import {Fencer} from "@/types/fencer";
import {CreateFencer} from "@/components/CreateFencer";

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
                        <th>Weapon</th>
                        <th>Playlist ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {fencers.map((fencer) => (
                        <tr key={fencer.id}>
                            <td>{fencer.name}</td>
                            <td>{fencer.weapon}</td>
                            <td>{fencer.playlistId}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
