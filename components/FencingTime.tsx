import React, { useState } from 'react';
import { useTouchStore } from "@/state/touchState";

export function FencingTime() {
    const [showFencingTime, setShowFencingTime] = useState(false);

    const fencingStartTime = useTouchStore((state) => state.fencingStartTime);
    const fencingEndTime = useTouchStore((state) => state.fencingEndTime);

    return (
        <div className="flex items-center">
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
                <div className="flex flex-col">
                    <label>
                        <span className="ml-2 label-text">Start (M:SS)</span>
                        <input
                            className="mx-2"
                            type="number"
                            min="0"
                            max="3"
                            value={fencingStartTime?.minutes}
                            onChange={(e) =>
                                useTouchStore.getState().setFencingStartTime({
                                    minutes: parseInt(e.target.value, 10),
                                    seconds: fencingStartTime?.seconds || 0,
                                })
                            }
                        />
                        :
                        <input
                            className="mx-2"
                            type="number"
                            min="0"
                            max="59"
                            value={fencingStartTime?.seconds}
                            onChange={(e) =>
                                useTouchStore.getState().setFencingStartTime({
                                    minutes: fencingStartTime?.minutes || 0,
                                    seconds: parseInt(e.target.value, 10),
                                })
                            }
                        />
                    </label>
                    <label className="pl-1.5">
                        <span className="ml-2 label-text">End (M:SS)</span>
                        <input
                            className="mx-2"
                            type="number"
                            min="0"
                            max="3"
                            value={fencingEndTime?.minutes}
                            onChange={(e) =>
                                useTouchStore.getState().setFencingEndTime({
                                    minutes: parseInt(e.target.value, 10),
                                    seconds: fencingEndTime?.seconds || 0,
                                })
                            }
                        />
                        :
                        <input
                            className="mx-2"
                            type="number"
                            min="0"
                            max="59"
                            value={fencingEndTime?.seconds || 0}
                            onChange={(e) =>
                                useTouchStore.getState().setFencingEndTime({
                                    minutes: fencingEndTime?.minutes || 0,
                                    seconds: parseInt(e.target.value, 10),
                                })
                            }
                        />
                    </label>
                </div>
            )}
        </div>
    );
}
