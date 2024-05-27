'use client'

import { useEffect, useState } from 'react';
import { getAllTouchesForFencer } from '@/lib/firestore/touches/getFencerTouches';
import { getFencerById } from '@/lib/firestore/fencers/getFencerById';
import {Fencer} from "@/types/fencer";

export default function Touches({ params }: { params: { fencerId: string } }) {
    const [fencer, setFencer] = useState<Fencer | null>(null);
    const [touches, setTouches] = useState<Touch[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fencerData = await getFencerById(params.fencerId);
                const fencerTouches = await getAllTouchesForFencer(params.fencerId);
                setFencer(fencerData);
                setTouches(fencerTouches);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.fencerId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-8">
            <div className="flex justify-between">
                <h1 className="text-2xl">Fencer touch analysis</h1>
                <h1 className="text-2xl">{fencer?.name}</h1>
            </div>
            <div>
                <h2 className="text-xl">Touches:</h2>
                <ul>
                    {touches.map((touch, index) => (
                        <li key={index}>{JSON.stringify(touch)}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
