import React, { useState } from 'react';
import {useTouchStore} from "@/state/touchState";

export function FencingTime() {
    const [showFencingTime, setShowFencingTime] = useState(false);

    return (
        <div>
            <label className="cursor-pointer label w-40">
                <span className="label-text">Fencing Time</span>
                <input
                    type="checkbox"
                    className="toggle toggle-warning"
                    checked={showFencingTime}
                    onChange={() => setShowFencingTime(!showFencingTime)}
                />
            </label>

            {showFencingTime && (
                <div>
                    <label>
                        <span className="ml-2 label-text">Fencing Start Time (M:SS)</span>
                        <input
                            className="mx-2"
                            type="number"
                            min="0"
                            max="3"
                            value={useTouchStore.getState().fencingStartTime?.minutes}
                            onChange={(e) => useTouchStore.getState().setFencingStartTime({
                                minutes: parseInt(e.target.value, 10),
                                seconds: useTouchStore.getState().fencingStartTime?.seconds || 0,
                            })}
                        />
                        :
                        <input
                            className="mx-2"
                            type="number"
                            min="0"
                            max="59"
                            value={useTouchStore.getState().fencingStartTime?.seconds}
                            onChange={(e) => useTouchStore.getState().setFencingStartTime({
                                minutes: useTouchStore.getState().fencingStartTime?.minutes || 0,
                                seconds: parseInt(e.target.value, 10),
                            })}
                        />
                    </label>
                    <label>
                        <span className="ml-2 label-text">Fencing End Time (M:SS)</span>
                        <input
                            className="mx-2"
                            type="number"
                            min="0"
                            max="3"
                            value={useTouchStore.getState().fencingEndTime?.minutes}
                            onChange={(e) => useTouchStore.getState().setFencingEndTime({
                                minutes: parseInt(e.target.value, 10),
                                seconds: useTouchStore.getState().fencingEndTime?.seconds || 0,
                            })}
                        />
                        :
                        <input
                            className="mx-2"
                            type="number"
                            min="0"
                            max="59"
                            value={useTouchStore.getState().fencingEndTime?.seconds || 0}
                            onChange={(e) => useTouchStore.getState().setFencingEndTime({
                                minutes: useTouchStore.getState().fencingEndTime?.minutes || 0,
                                seconds: parseInt(e.target.value, 10),
                            })}
                        />
                    </label>
                </div>
            )}
        </div>
    );
}
