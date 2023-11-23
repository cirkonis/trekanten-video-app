import {useVideoStore} from "@/state/videoState";
import React from "react";

export function FencerNameInputs() {
    return (
        <div className="flex my-4 p-4">
            <div className="mr-8">
                <input
                    className="input input-bordered input-secondary"
                    type="text"
                    placeholder="Left Fencer"
                    value={useVideoStore.getState().leftFencer.name}
                    onChange={(e) => useVideoStore.getState().setLeftFencer({
                        ...useVideoStore.getState().leftFencer,
                        name: e.target.value
                    })}
                    required
                />
            </div>
            <div className="">
                <input
                    className="input input-bordered input-secondary"
                    type="text"
                    placeholder="Right Fencer"
                    value={useVideoStore.getState().rightFencer.name}
                    onChange={(e) => useVideoStore.getState().setRightFencer({
                        ...useVideoStore.getState().rightFencer,
                        name: e.target.value
                    })}
                    required
                />
            </div>
        </div>
    )
}