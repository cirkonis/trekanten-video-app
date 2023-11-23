'use client'


import React, {useState} from "react";
import Player from "react-player";
import {ETouchTypes} from "@/enums/ETouchTypes";
import { useVideoStore } from "@/state/videoState";
import {useTouchStore} from "@/state/touchState";
import {FencingTouch} from "@/types/fencingTouch";
import {FencerNameInputs} from "@/components/FencerNameInputs";
import {TouchSequenceBuilder} from "@/components/TouchSequenceBuilder";

export default function Video() {
    const videoStore = useVideoStore();
    const touchStore = useTouchStore();
    const playerRef = React.createRef();
    const [playing, setPlaying] = useState(false);
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
            videoStore.setPausedTimeStamp(currentTime);
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

    function handleAddTouch(){
        useVideoStore.getState().addTouch(useTouchStore.getState());
    };
    
    function getTouchDescription(touch: FencingTouch): string {
        const touchType = touch.type;

        if (touchType === ETouchTypes.SINGLE_TOUCH) {
            return `by ${touch.givenTo[0].name} at ${touch.position}`;
        } else {
            return touchType === ETouchTypes.DOUBLE_TOUCH ? 'Double Touch' : 'No Touch';
        }
    }

    function validateForm(){
        console.log('validate logic')
    }

    return (
        <div>
            <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
            />

            {uploadedVideo && (
                <div>
                    <Player
                        // @ts-ignore
                        ref={playerRef}
                        url={uploadedVideo}
                        playing={playing}
                        controls={true}
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                        onProgress={handlePause}
                    />
                </div>
            )}
            <div>
                <div>
                    <FencerNameInputs />
                    <TouchSequenceBuilder />
            {/*        /!* TOUCH AWARDED *!/*/}
            {/*        <div className="text-blue-600">*/}
            {/*            <Select*/}
            {/*                options={[*/}
            {/*                    {*/}
            {/*                        value: 'NO_FENCER',*/}
            {/*                        label: 'NO FENCER',*/}
            {/*                    },*/}
            {/*                    {*/}
            {/*                        value: 'BOTH_FENCER',*/}
            {/*                        label: 'BOTH FENCER',*/}
            {/*                    },*/}
            {/*                    {*/}
            {/*                        value: useVideoStore.getState().leftFencer.name,*/}
            {/*                        label: useVideoStore.getState().leftFencer.name,*/}
            {/*                    },*/}
            {/*                    {*/}
            {/*                        value: useVideoStore.getState().rightFencer.name,*/}
            {/*                        label: useVideoStore.getState().rightFencer.name,*/}
            {/*                    },*/}
            {/*                ]}*/}
            {/*                value={{*/}
            {/*                    value: actionData.touch.givenTo ? actionData.touch.givenTo.name : 'NO_FENCER',*/}
            {/*                    label: actionData.touch.givenTo ? actionData.touch.givenTo.name : 'NO_FENCER',*/}
            {/*                }}*/}
            {/*                onChange={(selectedOption) => {*/}
            {/*                    selectedOption = selectedOption || { value: 'NO_FENCER', label: 'NO FENCER' };*/}
            {/*                    let updatedActionData;*/}

            {/*                    if (selectedOption.value === 'NO_FENCER') {*/}
            {/*                        updatedActionData = {*/}
            {/*                            ...actionData,*/}
            {/*                            touch: {*/}
            {/*                                type: ETouchTypes.NO_TOUCH,*/}
            {/*                            },*/}
            {/*                        };*/}
            {/*                    } else if (selectedOption.value === 'BOTH_FENCER') {*/}
            {/*                        updatedActionData = {*/}
            {/*                            ...actionData,*/}
            {/*                            touch: {*/}
            {/*                                type: ETouchTypes.DOUBLE_TOUCH,*/}
            {/*                            },*/}
            {/*                        };*/}
            {/*                    } else {*/}
            {/*                        const selectedFencer = selectedOption.value === useVideoStore.getState().leftFencer.name*/}
            {/*                            ? useVideoStore.getState().leftFencer*/}
            {/*                            : useVideoStore.getState().rightFencer;*/}

            {/*                        const otherFencer = selectedOption.value === useVideoStore.getState().leftFencer.name*/}
            {/*                            ? useVideoStore.getState().rightFencer*/}
            {/*                            : useVideoStore.getState().leftFencer;*/}

            {/*                        updatedActionData = {*/}
            {/*                            ...actionData,*/}
            {/*                            touch: {*/}
            {/*                                type: ETouchTypes.SINGLE_TOUCH,*/}
            {/*                                givenTo: selectedFencer,*/}
            {/*                                receivedBy: otherFencer,*/}
            {/*                            },*/}
            {/*                        };*/}

            {/*                    }*/}

            {/*                    setActionData(updatedActionData);*/}
            {/*                }}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        /!*POSITION*!/*/}
            {/*        <div className="text-blue-600">*/}
            {/*            <Select*/}
            {/*                placeholder="Select Position"*/}
            {/*                options={Object.values(EPositions).map((position) => ({*/}
            {/*                    value: position,*/}
            {/*                    label: position,*/}
            {/*                }))}*/}
            {/*                value={{*/}
            {/*                    value: actionData.position,*/}
            {/*                    label: actionData.position,*/}
            {/*                }}*/}
            {/*                onChange={(selectedOption) => {*/}
            {/*                    // @ts-ignore*/}
            {/*                    setActionData({...actionData, position: selectedOption.value as EPositions});*/}
            {/*                }}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        /!* TOGGLE BUTTON for FENCING TIME *!/*/}
            {/*        <div className="text-blue-600">*/}
            {/*            <button onClick={() => setShowFencingTime(!showFencingTime)}>*/}
            {/*                {showFencingTime ? "Hide Fencing Time" : "Show Fencing Time"}*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*        /!* CONDITIONAL RENDERING for FENCING TIME *!/*/}
            {/*        {showFencingTime && (*/}
            {/*            <div>*/}
            {/*                <div className="text-blue-600">*/}
            {/*                    <label>Fencing Start Time (mm:ss)</label>*/}
            {/*                    <input*/}
            {/*                        type="text"*/}
            {/*                        placeholder="Fencing Start Time (mm:ss)"*/}
            {/*                        value={formatTime(videoStore.currentFencingStartTime)}*/}
            {/*                        onChange={(e) => videoStore.setCurrentTouchFencingStartTime(parseTime(e.target.value))}*/}
            {/*                        required*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*                <div className="text-blue-600">*/}
            {/*                    <label>Fencing End Time (mm:ss)</label>*/}
            {/*                    <input*/}
            {/*                        type="text"*/}
            {/*                        placeholder="Fencing End Time (mm:ss)"*/}
            {/*                        value={formatTime(videoStore.currentFencingEndTime || 0)}*/}
            {/*                        onChange={(e) => videoStore.setCurrentTouchFencingEndTime(parseTime(e.target.value))}*/}
            {/*                        required*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        )}*/}

            {/*        /!*ACTION TIME STAMP*!/*/}
            {/*        <div>*/}
            {/*            <div className="flex flex-col">*/}
            {/*                <div>*/}
            {/*                    Current Timestamp: {timestamp.toFixed(2)} seconds*/}
            {/*                </div>*/}
            {/*                <div>Action Start Time: {videoStore.currentActionStartTime}</div>*/}
            {/*                <div>Action End Time: {videoStore.currentActionEndTime}</div>*/}
            {/*                <div className="mb-4">*/}
            {/*                    <button className="btn btn-secondary mx-2" type="button" onClick={handleSetActionStartTime}>*/}
            {/*                        Set Action Start Time to Current Timestamp*/}
            {/*                    </button>*/}
            {/*                    <button className="btn btn-secondary mx-2" type="button" onClick={handleSetActionEndTime}>*/}
            {/*                        Set Action End Time to Current Timestamp*/}
            {/*                    </button>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
                </div>
            </div>
            <div>
                <p>Actions:</p>
                <ul>
                    {useVideoStore.getState().touches.map((touch: FencingTouch, index: number) => (
                        <li key={index}>
                            <button onClick={() => handleJumpToTimestamp(touch.videoStartTimeStamp)}>
                                Jump to touch
                            </button>
                            - {touch.sequence} by {getTouchDescription(touch)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>


    );
}
