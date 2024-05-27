'use client';

import { useEffect, useState } from 'react';
import { getAllTouchesForFencer } from '@/lib/firestore/touches/getFencerTouches';
import { getFencerById } from '@/lib/firestore/fencers/getFencerById';
import { Fencer } from '@/types/fencer';
import PistePositionPie from '@/app/fencers/[fencerId]/charts/PistePositionPie';
import {Touch} from "@/types/fencingTouch";

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
                // @ts-ignore
                setTouches(fencerTouches);
                setError(null); // Clear previous errors
            } catch (err) {
                console.error(err); // Log the error for debugging
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

    // Filter touches into touchesFor and touchesAgainst
    const touchesFor: Touch[] = touches.filter(touch =>
        touch.pointAwardedTo.some(fencerAwarded => fencerAwarded.id === params.fencerId)
    );

    const touchesAgainst = touches.filter(touch =>
        touch.touchAgainst.some(fencerAgainst => fencerAgainst.id === params.fencerId)
    );

    return (
        <div className="p-8">
            <div className="flex justify-between">
                <h1 className="text-2xl">Fencer touch analysis</h1>
                <h1 className="text-2xl">{fencer?.name}</h1>
            </div>
            <div>
                <h2 className="text-xl">Touches:</h2>
                {/* Uncomment and adapt this section to render touches if needed */}
                {/* <ul>
                    {touches.map((touch, index) => (
                        <li key={index}>{JSON.stringify(touch)}</li>
                    ))}
                </ul> */}
            </div>
            <div>
                <h1 className="py-4">Piste Position for Touches</h1>
                <div className="flex">
                    <PistePositionPie title="Awarded" touchData={touchesFor} />
                    <PistePositionPie title="Against" touchData={touchesAgainst} />
                </div>
            </div>
        </div>
    );
}
