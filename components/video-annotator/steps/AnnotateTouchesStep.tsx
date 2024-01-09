import Player from "react-player";
import React, {useEffect, useState} from "react";
import {useVideoStore} from "@/state/videoState";
import {useTouchStore} from "@/state/touchState";
import {formatTime} from "@/utils/FormatTime";
import {TouchSequenceBuilder} from "@/components/TouchSequenceBuilder";
import {TouchAwarded} from "@/components/TouchAwarded";
import {PistePosition} from "@/components/PistePosition";
import {ETouchTypes} from "@/enums/ETouchTypes";
import {FencingTouch} from "@/types/fencingTouch";
import {useStepStore} from "@/state/annotationStepsState";

export function AnnotateTouchesStep() {
    const uploadedVideo = useVideoStore((state) => state.url);
    const playerRef = useVideoStore((state) => state.playerRef);
    const videoTitle = useVideoStore((state) => state.title);
    const leftFencer = useVideoStore((state) => state.leftFencer);
    const rightFencer = useVideoStore((state) => state.rightFencer);
    const touchStartTime = useTouchStore(state => state.videoStartTimeStamp);
    const [localValidation, setLocalValidation] = useState(false); // Local validation state
    const touches = useVideoStore((state) => state.touches);
    const setStep = useStepStore((state) => state.setCurrentStep);


    useEffect(() => {
        const handleProgress = (state: { playedSeconds: number }) => {
            // Update timestamp when video is playing
            useTouchStore.getState().setVideoStartTimeStamp(state.playedSeconds);
        };

        // Subscribe to the onProgress event to detect the playing state
        if (playerRef && playerRef.current) {
            const player = playerRef.current.getInternalPlayer('video');
            if (player) {
                player.addEventListener('progress', handleProgress);
            }
        }

        // Unsubscribe when the component unmounts
        return () => {
            if (playerRef && playerRef.current) {
                const player = playerRef.current.getInternalPlayer('video');
                if (player) {
                    player.removeEventListener('progress', handleProgress);
                }
            }
        };
    }, [playerRef]);

    const handleSetStartTime = () => {
        if (playerRef.current) {
            const currentTime = Math.round((playerRef.current as Player).getCurrentTime());
            useTouchStore.getState().setVideoStartTimeStamp(currentTime);
            const isValid = currentTime !== 0;
            setLocalValidation(isValid);
        }
    };

    const handleSeekToTouch = (startTimeStamp: number) => {
        if (playerRef.current) {
            playerRef.current.seekTo(startTimeStamp);
        }
    };

    // Sort touches by earliest video start time to latest video start time
    const sortedTouches = [...touches].sort((a, b) => compareTimes(a.videoStartTimeStamp, b.videoStartTimeStamp));

    function compareTimes(timeA: number, timeB: number): number {
        return timeA - timeB;
    }

    function handleRemoveTouch(touch: FencingTouch) {
        useVideoStore.getState().removeTouch(touch);
    }

    const handleNextStep = () => {
        if (leftFencer && rightFencer) {
            setStep(3);
        } else {
            // Otherwise, display an error message or handle it as you see fit
            console.error("Please select both left and right fencers.");
        }
    };

        const isVideoValid = () => {
            const touches = useVideoStore.getState().touches;
            return touches.length > 0;
        }

    return (
        <div className="flex flex-col w-full pb-24">
            <div className="flex flex-row items-center px-8 justify-between">
                <h1 className="text-xl font-semi-bold my-6"> Annotate Touches </h1>
                <button
                    onClick={handleNextStep}
                    disabled={!isVideoValid()}
                    className="btn btn-primary btn-large">
                    Submit Video
                </button>
            </div>
            <div className="flex flex-col w-full items-center">
                <h2 className="text-xl font-bold my-4">{videoTitle}</h2>
                <div className="flex text-lg font-bold w-1/2 justify-between my-6">
                    <p>{leftFencer.name}</p>
                    <p>{rightFencer.name}</p>
                </div>
                <Player
                    ref={playerRef}
                    url={uploadedVideo}
                    onPlaying={() => {
                    }}
                    controls={true}
                />
            </div>
            <div className="divider"></div>
            <div className="flex justify-evenly">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-row items-center mb-4">
                        <div>Touch start time:</div>
                        <div className="text-xl mx-2">{formatTime(touchStartTime)} </div>
                    </div>
                    <button className="btn btn-accent btn-sm mx-4" onClick={handleSetStartTime}>Set Touch Start Time
                    </button>
                </div>
            </div>
            <div className="divider"></div>
            <TouchSequenceBuilder/>
            <TouchAwarded/>
            <PistePosition/>
            {/*    ADD TOUCH BUTTON   */}
            <div className="flex justify-center mt-8">
                <button
                    className="btn btn-secondary btn-lg"
                    onClick={() => {
                        if (localValidation) {
                            // If local validation is successful, add touch to the video touches array
                            useVideoStore.getState().addTouch({
                                type: useTouchStore.getState().type,
                                pointAwardedTo: useTouchStore.getState().pointAwardedTo,
                                touchAgainst: useTouchStore.getState().touchAgainst,
                                sequence: useTouchStore.getState().sequence,
                                videoStartTimeStamp: touchStartTime,
                                videoEndTimeStamp: useTouchStore.getState().videoEndTimeStamp,
                                fencingStartTime: useTouchStore.getState().fencingStartTime,
                                fencingEndTime: useTouchStore.getState().fencingEndTime,
                                position: useTouchStore.getState().position,
                            });
                            // Reset the touch state after adding
                            useTouchStore.getState().resetTouch();
                            // Reset local validation state
                            setLocalValidation(false);
                        }
                    }}
                    disabled={!localValidation} // Disable the button if local validation fails
                >
                    Add Touch
                </button>
            </div>
            <div className="divider"></div>
            {/* TOUCHES LIST */}
            <div>
                <h1 className="text-2xl font-semibold px-8">Touches</h1>
                <div>
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
                                <button
                                    className="btn btn-info btn-circle btn-small"
                                    onClick={() => handleSeekToTouch(touch.videoStartTimeStamp)}
                                >
                                    Seek To
                                </button>
                                <button className="btn btn-warning btn-circle btn-small" onClick={() => handleRemoveTouch(touch)}>🗑️</button>
                            </div>
                            <div className="divider w-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}