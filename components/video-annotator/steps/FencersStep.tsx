import React, {useEffect, useState} from "react";
import {useVideoStore} from "@/state/videoState";
import {Fencer} from "@/types/fencer";
import {CreateFencer} from "@/components/CreateFencer";
import {useStepStore} from "@/state/annotationStepsState";

export function FencersStep() {
    const [fencers, setFencers] = useState<Fencer[]>([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const leftFencer = useVideoStore((state) => state.leftFencer);
    const rightFencer = useVideoStore((state) => state.rightFencer);
    const setStep = useStepStore((state) => state.setCurrentStep);

    const setLeftFencer = (selectedFencerId: string) => {
        const selectedFencer = fencers.find((f) => f.id === selectedFencerId);
        if (selectedFencer) {
            useVideoStore.getState().setLeftFencer(selectedFencer);
        } else {
            console.error('Error setting left fencer');
        }
    };

    const setRightFencer = (selectedFencerId: string) => {
        const selectedFencer = fencers.find((f) => f.id === selectedFencerId);
        if (selectedFencer) {
            useVideoStore.getState().setRightFencer(selectedFencer);
        } else {
            console.error('Error setting right fencer');
        }
    };

    const handleCreateFencer = async (name: string) => {
        // Notify parent component about the new fencer
        setFencers((prevFencers) => [...prevFencers, { id: "new-id", name }]); // Replace with actual fencer data
    };

    // Function to check if both selected fencers are valid
    const areSelectedFencersValid = () => {
        return (
            leftFencer &&
            rightFencer &&
            fencers.some((fencer) => fencer.id === leftFencer.id) &&
            fencers.some((fencer) => fencer.id === rightFencer.id)
        );
    };

    const handleNextStep = () => {
        if (leftFencer && rightFencer) {
            setStep(2);
        } else {
            // Otherwise, display an error message or handle it as you see fit
            console.error("Please select both left and right fencers.");
        }
    };

    useEffect(() => {
        const fetchFencersData = async () => {
            try {
                const fencersData: Fencer[] = await fetch('/api/fencers', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                    .then((res) => res.json())
                    .then((data) => data)
                    .catch(() => []);
                setFencers(fencersData); // Your API call to fetch fencers
            } catch (error) {
                console.error("Error fetching fencers:", error);
            }
        };

        fetchFencersData().then(() => setLoading(false));
    }, []); // Run once on component mount

    return (
        <div className="flex flex-col w-full my-4 p-4">
            {loading ? (
                <div className="flex w-full justify-center items-start min-h-[96px]">
                    <p className="text-xl font-semibold">🤺 Fetching Fencers 🤺</p>
                </div>
            ) : (
                <div className="flex flex-col">
                    <div className="flex w-full justify-center">
                        <p className="text-xl font-semibold">🤺 Select Fencers 🤺</p>
                    </div>
                <div className="flex w-full flex-row justify-evenly items-center my-8">
                    <div className="flex items-center">
                        <label htmlFor="leftFencer" className="mx-4 text-md font-semibold">Left Fencer:</label>
                        <select
                            id="leftFencer"
                            className="select select-bordered"
                            defaultValue=""
                            onChange={(e) => setLeftFencer(e.target.value)}
                        >
                            <option disabled value="">
                                Select Fencer
                            </option>
                            {fencers
                                .filter((fencer) => fencer.id !== rightFencer.id) // Exclude right selected fencer
                                .map((fencer) => (
                                    <option key={fencer.id} value={fencer.id}>
                                        {fencer.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                        <div className="flex items-center">
                            <label htmlFor="rightFencer" className="mx-4 text-md font-semibold">Right Fencer:</label>
                            <select
                                id="rightFencer"
                                className="select select-bordered"
                                defaultValue=""
                                onChange={(e) => setRightFencer(e.target.value)}
                            >
                                <option disabled value="">
                                    Select Fencer
                                </option>
                                {fencers
                                    .filter((fencer) => fencer.id !== leftFencer.id) // Exclude left selected fencer
                                    .map((fencer) => (
                                        <option key={fencer.id} value={fencer.id}>
                                            {fencer.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}
            <div className="divider w-full mx-8 font-bold">OR</div>
            <div className="flex w-full flex-row justify-evenly items-center my-8">
                <CreateFencer onCreate={handleCreateFencer} />
            </div>
            {/* Conditionally set the disabled attribute based on videoTitle and uploadedVideo */}
            <div className="px-8 flex w-full justify-end">
                <button
                    className="btn btn-primary"
                    onClick={handleNextStep}
                    disabled={!areSelectedFencersValid()}
                >
                    Next: Annotate Touches
                </button>
            </div>
        </div>
    );
}
