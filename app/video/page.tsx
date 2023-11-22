'use client'


import React, {useState} from "react";
import Player from "react-player";
import {EPosition} from "@/enums/EPosition";
import Select from "react-select";
import {ETouche} from "@/enums/ETouche";
import { useVideoStore } from "@/state/videoState";
import {useTouchStore} from "@/state/touchState";

export default function Video() {
    const videoStore = useVideoStore();
    const touchStore = useTouchStore();
    const playerRef = React.createRef();
    const [playing, setPlaying] = useState(false);
    const [timestamp, setTimestamp] = useState(0);
    const [showFencingTime, setShowFencingTime] = useState(false);
    const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null && e.target.files.length > 0) {
            setUploadedVideo(URL.createObjectURL(e.target.files[0]));
        } else {
            // TODO: Handle error
            console.log('Error uploading video');
        }
    };
    const handlePause = () => {
        if (playerRef.current) {
            const currentTime = (playerRef.current as any).getCurrentTime();
            setTimestamp(currentTime); // Update the timestamp when the video is paused
        }
    };

    function formatTime(timeInSeconds: number) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function parseTime(timeString: string) {
        const [minutes, seconds] = timeString.split(':').map((part) => parseInt(part, 10));
        if (!isNaN(minutes) && !isNaN(seconds)) {
            return minutes * 60 + seconds;
        }
        return 0; // Return 0 if the input is not in mm:ss format
    }


    const handleJumpToTimestamp = (timestamp: number) => {
        // @ts-ignore
        if (playerRef.current && playerRef.current.seekTo) {
            // @ts-ignore
            playerRef.current.seekTo(timestamp);
        }
    };
    // @ts-ignore
    const handleAddTouch = (e) => {
        e.preventDefault();
        useVideoStore.getState().addTouch(useTouchStore.getState());
    };

    function handleSetActionStartTime() {
        setActionData({
            ...actionData,
            videoStartTimeStamp: timestamp,
        });
    }

    function handleSetActionEndTime() {
        setActionData({
            ...actionData,
            videoEndTimestamp: timestamp,
        });
    }

    function getActionDescription(action: any): string {
        const touchType = action.touch.type;

        if (touchType === ETouche.SINGLE_TOUCH) {
            return `by ${action.touch.givenTo.name} at ${action.position}`;
        } else {
            return touchType === ETouche.DOUBLE_TOUCH ? 'Double Touch' : 'No Touch';
        }
    }

    return (
        <div>
            <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
            />

            {video && (
                <div>
                    <Player
                        // @ts-ignore
                        ref={playerRef}
                        url={video}
                        playing={playing}
                        controls={true}
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                        onProgress={handlePause}
                    />
                </div>
            )}
            <div>
                <form onSubmit={handleAddTouch}>
                    {/*LEFT FENCER*/}
                    <div className="text-blue-600">
                        <input
                            type="text"
                            placeholder="Left Fencer"
                            value={useVideoStore.getState().leftFencer.name}
                            onChange={(e) => useVideoStore.getState().setLeftFencer({...useVideoStore.getState().leftFencer, name: e.target.value})}
                            required
                        />
                    </div>
                    {/*RIGHT FENCER*/}
                    <div className="text-blue-600">
                        <input
                            type="text"
                            placeholder="Right Fencer"
                            value={useVideoStore.getState().rightFencer.name}
                            onChange={(e) => useVideoStore.getState().setRightFencer({...useVideoStore.getState().rightFencer, name: e.target.value})}
                            required
                        />
                    </div>
                    {/*ACTION SEQUENCE*/}
                    <div className="text-blue-600">
                        <Select
                            isMulti
                            placeholder="Select Actions"
                            options={Object.values(EActions).map((action) => ({
                                value: action,
                                label: action,
                            }))}
                            value={actionData.sequence.map((action) => ({
                                value: action,
                                label: action,
                            }))}
                            onChange={(selectedOptions) => {
                                setActionData({
                                    ...actionData,
                                    sequence: selectedOptions.map((option) => option.value)
                                });
                            }}
                        />
                    </div>
                    {/* TOUCH AWARDED */}
                    <div className="text-blue-600">
                        <Select
                            options={[
                                {
                                    value: 'NO_FENCER',
                                    label: 'NO FENCER',
                                },
                                {
                                    value: 'BOTH_FENCER',
                                    label: 'BOTH FENCER',
                                },
                                {
                                    value: useVideoStore.getState().leftFencer.name,
                                    label: useVideoStore.getState().leftFencer.name,
                                },
                                {
                                    value: useVideoStore.getState().rightFencer.name,
                                    label: useVideoStore.getState().rightFencer.name,
                                },
                            ]}
                            value={{
                                value: actionData.touch.givenTo ? actionData.touch.givenTo.name : 'NO_FENCER',
                                label: actionData.touch.givenTo ? actionData.touch.givenTo.name : 'NO_FENCER',
                            }}
                            onChange={(selectedOption) => {
                                selectedOption = selectedOption || { value: 'NO_FENCER', label: 'NO FENCER' };
                                let updatedActionData;

                                if (selectedOption.value === 'NO_FENCER') {
                                    updatedActionData = {
                                        ...actionData,
                                        touch: {
                                            type: ETouche.NO_TOUCH,
                                        },
                                    };
                                } else if (selectedOption.value === 'BOTH_FENCER') {
                                    updatedActionData = {
                                        ...actionData,
                                        touch: {
                                            type: ETouche.DOUBLE_TOUCH,
                                        },
                                    };
                                } else {
                                    const selectedFencer = selectedOption.value === useVideoStore.getState().leftFencer.name
                                        ? useVideoStore.getState().leftFencer
                                        : useVideoStore.getState().rightFencer;

                                    const otherFencer = selectedOption.value === useVideoStore.getState().leftFencer.name
                                        ? useVideoStore.getState().rightFencer
                                        : useVideoStore.getState().leftFencer;

                                    updatedActionData = {
                                        ...actionData,
                                        touch: {
                                            type: ETouche.SINGLE_TOUCH,
                                            givenTo: selectedFencer,
                                            receivedBy: otherFencer,
                                        },
                                    };

                                }

                                setActionData(updatedActionData);
                            }}
                        />
                    </div>
                    {/*POSITION*/}
                    <div className="text-blue-600">
                        <Select
                            placeholder="Select Position"
                            options={Object.values(EPosition).map((position) => ({
                                value: position,
                                label: position,
                            }))}
                            value={{
                                value: actionData.position,
                                label: actionData.position,
                            }}
                            onChange={(selectedOption) => {
                                // @ts-ignore
                                setActionData({...actionData, position: selectedOption.value as EPosition});
                            }}
                        />
                    </div>
                    {/* TOGGLE BUTTON for FENCING TIME */}
                    <div className="text-blue-600">
                        <button onClick={() => setShowFencingTime(!showFencingTime)}>
                            {showFencingTime ? "Hide Fencing Time" : "Show Fencing Time"}
                        </button>
                    </div>
                    {/* CONDITIONAL RENDERING for FENCING TIME */}
                    {showFencingTime && (
                        <div>
                            <div className="text-blue-600">
                                <label>Fencing Start Time (mm:ss)</label>
                                <input
                                    type="text"
                                    placeholder="Fencing Start Time (mm:ss)"
                                    value={formatTime(videoStore.currentFencingStartTime)}
                                    onChange={(e) => videoStore.setCurrentTouchFencingStartTime(parseTime(e.target.value))}
                                    required
                                />
                            </div>
                            <div className="text-blue-600">
                                <label>Fencing End Time (mm:ss)</label>
                                <input
                                    type="text"
                                    placeholder="Fencing End Time (mm:ss)"
                                    value={formatTime(videoStore.currentFencingEndTime || 0)}
                                    onChange={(e) => videoStore.setCurrentTouchFencingEndTime(parseTime(e.target.value))}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/*ACTION TIME STAMP*/}
                    <div>
                        <div className="flex flex-col">
                            <div>
                                Current Timestamp: {timestamp.toFixed(2)} seconds
                            </div>
                            <div>Action Start Time: {videoStore.currentActionStartTime}</div>
                            <div>Action End Time: {videoStore.currentActionEndTime}</div>
                            <div className="mb-4">
                                <button className="btn btn-secondary mx-2" type="button" onClick={handleSetActionStartTime}>
                                    Set Action Start Time to Current Timestamp
                                </button>
                                <button className="btn btn-secondary mx-2" type="button" onClick={handleSetActionEndTime}>
                                    Set Action End Time to Current Timestamp
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <p>Actions:</p>
                <ul>
                    {useVideoStore.getState().touches.map((action: any, index: number) => (
                        <li key={index}>
                            <button onClick={() => handleJumpToTimestamp(action.actionStartTime)}>
                                Jump to {action.actionStartTime} seconds
                            </button>
                            - {action.actionSequence} by {getActionDescription(action)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>


    );
}
