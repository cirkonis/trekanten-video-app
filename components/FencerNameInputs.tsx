import { useVideoStore } from "@/state/videoState";
import React from "react";

export function FencerNameInputs() {
    const leftFencer = useVideoStore((state) => state.leftFencer);
    const rightFencer = useVideoStore((state) => state.rightFencer);

    const setLeftFencerName = (name: string) => {
        useVideoStore.getState().setLeftFencer({ ...leftFencer, name });
    };

    const setRightFencerName = (name: string) => {
        useVideoStore.getState().setRightFencer({ ...rightFencer, name });
    };

    return (
        <div className="flex my-4 p-4">
            <div className="mr-8">
                <input
                    className="input input-bordered input-secondary"
                    type="text"
                    placeholder="Left Fencer"
                    value={leftFencer.name}
                    onChange={(e) => setLeftFencerName(e.target.value)}
                    required
                />
            </div>
            <div className="">
                <input
                    className="input input-bordered input-secondary"
                    type="text"
                    placeholder="Right Fencer"
                    value={rightFencer.name}
                    onChange={(e) => setRightFencerName(e.target.value)}
                    required
                />
            </div>
        </div>
    );
}
