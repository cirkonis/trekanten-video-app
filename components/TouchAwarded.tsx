import React from 'react';
import { ETouchTypes } from '@/enums/ETouchTypes';
import {useTouchStore} from "@/state/touchState";

export function TouchAwarded() {
    const handleTouchTypeChange = (type: ETouchTypes) => {
        useTouchStore.getState().setTouchType(type);
    };

    const touchType = useTouchStore.getState().type;

    return (
        <div className="my-4 p-4">
            <div>
                {/* Touch Type Radio Buttons */}
                <label className="mr-3">
                    <input
                        className="mr-2"
                        type="radio"
                        value={ETouchTypes.SINGLE_TOUCH}
                        checked={touchType === ETouchTypes.SINGLE_TOUCH}
                        onChange={() => handleTouchTypeChange(ETouchTypes.SINGLE_TOUCH)}
                    />
                    Single Touch
                </label>

                <label className="mr-3">
                    <input
                        className="mr-2"
                        type="radio"
                        value={ETouchTypes.DOUBLE_TOUCH}
                        checked={touchType === ETouchTypes.DOUBLE_TOUCH}
                        onChange={() => handleTouchTypeChange(ETouchTypes.DOUBLE_TOUCH)}
                    />
                    Double Touch
                </label>

                <label className="mr-3">
                    <input
                        className="mr-2"
                        type="radio"
                        value={ETouchTypes.NO_TOUCH}
                        checked={touchType === ETouchTypes.NO_TOUCH}
                        onChange={() => handleTouchTypeChange(ETouchTypes.NO_TOUCH)}
                    />
                    No Touch
                </label>
            </div>
            {/* ... Other components */}
        </div>
    );
}
