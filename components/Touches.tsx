import React from 'react';
import {useVideoStore} from "@/state/videoState";
import {formatTime} from "@/utils/FormatTime";
import {Time} from "@/types/time";
import {FencingTouch} from "@/types/fencingTouch";
import {ETouchTypes} from "@/enums/ETouchTypes";

export function Touches() {
    const touches = useVideoStore((state) => state.touches);

    // Sort touches by earliest video start time to latest video start time
    const sortedTouches = [...touches].sort((a, b) => compareTimes(a.videoStartTimeStamp, b.videoStartTimeStamp));

    function compareTimes(timeA: Time, timeB: Time): number {
        // Compare minutes first
        if (timeA.minutes !== timeB.minutes) {
            return timeA.minutes - timeB.minutes;
        }

        // If minutes are equal, compare seconds
        return timeA.seconds - timeB.seconds;
    }

    function handleRemoveTouch(touch: FencingTouch) {
        useVideoStore.getState().removeTouch(touch);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Touches</h1>
            {sortedTouches.map((touch, index) => (
                <div className="w-full px-4" key={index}>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <h2 className="mr-2">Touch {index + 1} - {formatTime(touch.videoStartTimeStamp)}</h2>
                            <p>{touch.type}</p>
                            {touch.type === ETouchTypes.SINGLE_TOUCH_LEFT || touch.type === ETouchTypes.SINGLE_TOUCH_RIGHT ? (
                                <p>for {touch.pointAwardedTo.map((fencer) => fencer.name).join(', ')}</p>
                            ) : null}
                            <p className="flex-shrink-0 ml-6">Sequence: {touch.sequence.join(', ')}</p>
                            <p className="flex-shrink-0 ml-6">Piste Position: {touch.position}</p>
                        </div>
                        <button className="btn btn-warning btn-circle btn-small" onClick={() => handleRemoveTouch(touch)}>🗑️</button>
                    </div>
                    <div className="divider w-full"></div>
                </div>
            ))}
        </div>

    );
}
