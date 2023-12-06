import React, { useEffect, useState } from 'react';
import { ETouchTypes } from '@/enums/ETouchTypes';
import { useTouchStore } from '@/state/touchState';
import { useVideoStore } from '@/state/videoState';

export function TouchAwarded() {
    const touchType = useTouchStore(state => state.type);
    const leftFencer = useVideoStore(state => state.leftFencer);
    const rightFencer = useVideoStore(state => state.rightFencer);
// ... (other state variables)

    const handleTouchTypeChange = (type: ETouchTypes) => {
        useTouchStore.getState().setTouchType(type);

        switch (type) {
            case ETouchTypes.SINGLE_TOUCH_LEFT:
                useTouchStore.getState().setPointAwardedTo([leftFencer]);
                useTouchStore.getState().setTouchAgainst([rightFencer]);
                break;
            case ETouchTypes.SINGLE_TOUCH_RIGHT:
                useTouchStore.getState().setPointAwardedTo([rightFencer]);
                useTouchStore.getState().setTouchAgainst([leftFencer]);
                break;
            case ETouchTypes.DOUBLE_TOUCH:
                useTouchStore.getState().setPointAwardedTo([
                    useVideoStore.getState().leftFencer,
                    useVideoStore.getState().rightFencer,
                ]);
                break;
            case ETouchTypes.NO_TOUCH:
                useTouchStore.getState().setTouchAgainst([
                    useVideoStore.getState().leftFencer,
                    useVideoStore.getState().rightFencer,
                ]);
                break;
            default:
                break;
        }
    };

    return (
        <div className="my-4 p-4">
            <div className="flex">
                {/* Touch Type Radio Buttons */}
                <label className="mr-3 flex">
                    <input
                        className="mr-2 radio radio-primary"
                        type="radio"
                        name="touchType"
                        value={ETouchTypes.SINGLE_TOUCH_LEFT}
                        checked={touchType === ETouchTypes.SINGLE_TOUCH_LEFT}
                        onChange={() => handleTouchTypeChange(ETouchTypes.SINGLE_TOUCH_LEFT)}
                    />
                    Touch awarded to {leftFencer.name}
                </label>

                <label className="mr-3 flex">
                    <input
                        className="mr-2 radio radio-primary"
                        type="radio"
                        name="touchType"
                        value={ETouchTypes.SINGLE_TOUCH_RIGHT}
                        checked={touchType === ETouchTypes.SINGLE_TOUCH_RIGHT}
                        onChange={() => handleTouchTypeChange(ETouchTypes.SINGLE_TOUCH_RIGHT)}
                    />
                    Touch awarded to {rightFencer.name}
                </label>

                <label className="mr-3 flex">
                    <input
                        className="mr-2 radio radio-primary"
                        type="radio"
                        name="touchType"
                        value={ETouchTypes.DOUBLE_TOUCH}
                        checked={touchType === ETouchTypes.DOUBLE_TOUCH}
                        onChange={() => handleTouchTypeChange(ETouchTypes.DOUBLE_TOUCH)}
                    />
                    Double Touch
                </label>

                <label className="mr-3 flex">
                    <input
                        className="mr-2 radio radio-primary"
                        type="radio"
                        name="touchType"
                        value={ETouchTypes.NO_TOUCH}
                        checked={touchType === ETouchTypes.NO_TOUCH}
                        onChange={() => handleTouchTypeChange(ETouchTypes.NO_TOUCH)}
                    />
                    No Touch
                </label>
            </div>
        </div>
    );
}
