import React from 'react';
import { useVideoStore } from "@/state/videoState";
import { useTouchStore } from "@/state/touchState";
import {FencingTouch} from "@/types/fencingTouch";

export function AddTouch() {
    const videoStore = useVideoStore();
    const touchStore = useTouchStore();

    // TODO IMPLEMENT FORM SUBMIT LOGIC HERE
    function handleAddTouch() {
        // TODO form validate

        // Create a new touch based on the current state of the touch store
        const newTouch: FencingTouch = { ...touchStore };

        // Add the new touch to the video state
        videoStore.addTouch(newTouch);
        touchStore.resetTouch();

    }

    return (
        <div className="my-6 p-8">
            <button className="btn btn-secondary btn-lg" onClick={() => handleAddTouch()}>
                Add Touch 🤺
            </button>
        </div>
    );
}
