'use client'

import React, {useState} from "react";
import {useVideoStore} from "@/state/videoState";
import {useTouchStore} from "@/state/touchState";
import {formatTime} from "@/utils/FormatTime";
import {TouchSequenceBuilder} from "@/components/TouchSequenceBuilder";
import {TouchAwarded} from "@/components/TouchAwarded";
import {PistePosition} from "@/components/PistePosition";
import {ETouchTypes} from "@/enums/ETouchTypes";
import {FencingTouch} from "@/types/fencingTouch";
import {useStepStore} from "@/state/annotationStepsState";
import {EVideoStatus} from "@/enums/EVideoStatus";
import {updateVideoData} from "@/lib/firestore/videos/updateVideo";
import {Fencer} from "@/types/fencer";
import YouTubePlayer from "@/components/YouTubePlayer";

export function AnnotateTouchesStep() {
    const videoTitle = useVideoStore((state) => state.title);
    const leftFencer = useVideoStore((state) => state.leftFencer);
    const rightFencer = useVideoStore((state) => state.rightFencer);
    const touchStartTime = useTouchStore(state => state.videoStartTimeStamp);
    const touches = useVideoStore((state) => state.touches);
    const [alertMessage, setAlertMessage] = useState(""); // Alert message state
    const [showAlert, setShowAlert] = useState(false);
    const setStep = useStepStore((state) => state.setCurrentStep);
    const [status, setStatus] = useState<EVideoStatus | null>(null);
    const youtubeVideoId = useVideoStore((state) => state.youtubeVideoId); // Get youtubeVideoId
    // Sort touches by earliest video start time to latest video start time
    const sortedTouches: any = [...touches].sort((a: any, b: any) => compareTimes(a.videoStartTimeStamp, b.videoStartTimeStamp));

    function compareTimes(timeA: number, timeB: number): number {
        return timeA - timeB;
    }

    async function handleRemoveTouch(touch: FencingTouch) {
        useVideoStore.getState().removeTouch(touch);
        await updateDraftTouches()
    }

    async function updateDraftTouches() {
        setStatus(EVideoStatus.SAVING_DRAFT);
        const videoData = {
            id: useVideoStore.getState().id,
            touches: useVideoStore.getState().touches,
        }
        try {
            await updateVideoData(videoData);
            setStatus(EVideoStatus.SAVED_DRAFT);
        } catch (e) {
            setStatus(EVideoStatus.FAILED_TO_SAVE_DRAFT);
            console.error("Error updating draft touches:", e);
        }
    }

    const handleNextStep = () => {
        if (isVideoValid()) {
            setStep(3);
        } else {
            // Otherwise, display an error message or handle it as you see fit
            console.error("Please add a touch to the video before proceeding.");
        }
    };

    const isVideoValid = () => {
        const touches = useVideoStore.getState().touches;
        return touches.length > 0;
    }

    function checkTouchValidity() {
        const touchType = useTouchStore.getState().type;
        const sequence = useTouchStore.getState().sequence;
        const startTime = useTouchStore.getState().videoStartTimeStamp;
        if (touchType !== null && sequence.length > 0 && startTime !== 0) {
            addTouch();
        } else {
            // Display an alert message
            setAlertMessage("Please fill out all touch information before adding.");
            setShowAlert(true);
        }
    }


    async function addTouch() {
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
        await updateDraftTouches();
        // Reset the touch state after adding
        useTouchStore.getState().resetTouch();
        setShowAlert(false);
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
                {youtubeVideoId && youtubeVideoId != "" && ( // Conditional rendering based on youtubeVideoId
                    <div className="w-full flex flex-col justify-evenly items-center my-8 p-16 min-h-[500px]">
                        <YouTubePlayer videoId={String(youtubeVideoId)}></YouTubePlayer>
                    </div>
                )}
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
                        checkTouchValidity()
                    }}
                    disabled={status === EVideoStatus.SAVING_DRAFT}
                >
                    {status === EVideoStatus.SAVING_DRAFT ? "Saving draft data 💾 🤺" : "Add Touch"}
                </button>
            </div>
            {/* Daisy UI Alert */}
            {showAlert && (
                <div
                    role="alert" className="alert alert-error my-2 mx-auto w-1/2 flex justify-center">
                    <svg
                        onClick={() => setShowAlert(false)}
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>{alertMessage}</span>
                </div>
            )}
            <div className="divider"></div>
            {/* TOUCHES LIST */}
            <div>
                <h1 className="text-2xl font-semibold px-8">Touches</h1>
                <div>
                    {sortedTouches.map((touch: any, index: number) => (
                        <div className="w-full px-4" key={index}>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <h2 className="mr-2">Touch {index + 1} - {formatTime(touch.videoStartTimeStamp)}</h2>
                                    <p>{touch.type}</p>
                                    {touch.type === ETouchTypes.SINGLE_TOUCH_LEFT || touch.type === ETouchTypes.SINGLE_TOUCH_RIGHT ? (
                                        <p>for {touch.pointAwardedTo.map((fencer: Fencer) => fencer.name).join(', ')}</p>
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
            </div>
        </div>
    )
}