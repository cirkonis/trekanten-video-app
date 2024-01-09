import {useVideoStore} from "@/state/videoState";
import React, {useEffect, useRef} from "react";
import Player from "react-player";
import {useStepStore} from "@/state/annotationStepsState";

export function VideoStep() {
    const uploadedVideo = useVideoStore((state) => state.url);
    const setUploadedVideo = useVideoStore((state) => state.setUploadedVideo);
    const videoTitle = useVideoStore((state) => state.title);
    const setStep = useStepStore((state) => state.setCurrentStep);

    const playerRef = useRef<Player | null>(null);

    useEffect(() => {
        useVideoStore.getState().setPlayerRef(playerRef);
    }, []);


    const setVideoTitle = (title: string) => {
        useVideoStore.getState().setTitle(title);
    }

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null && e.target.files.length > 0) {
            setUploadedVideo(URL.createObjectURL(e.target.files[0]));
        } else {
            // TODO: Handle error
            console.log('Error uploading video');
        }
    };

    const handleNextStep = () => {
        // Check if both video title and video are set
        if (videoTitle && uploadedVideo) {
            // If so, set the global step state to the select fencers step
            setStep(1);
        }
    };

    return (
        <div>
            <div className="flex items-center w-full justify-start">
                <h2 className="px-8 text-xl">Set video title:</h2>
                <input type="text" placeholder="Fencer's Fencing"
                       id="video-form"
                       className="input input-bordered w-full max-w-xs"
                       value={videoTitle}
                       onChange={(e) => setVideoTitle(e.target.value)}
                       required
                />
            </div>
            <div className="w-full flex flex-col justify-evenly items-center my-8 p-16 min-h-[500px]">
                {!uploadedVideo && (
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32">
                            <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"/>
                        </svg>
                    </div>
                )}
                {uploadedVideo && (
                    <div>
                        <Player
                            ref={playerRef}
                            url={uploadedVideo}
                            onPlaying={() => {}}
                            controls={true}
                        />
                    </div>
                )}
                <input
                    type="file"
                    accept="video/*"
                    className="mt-6 file-input file-input-bordered w-full max-w-xs"
                    onChange={handleVideoUpload}
                />
            </div>
            {/* Conditionally set the disabled attribute based on videoTitle and uploadedVideo */}
            <div className="px-8 flex w-full justify-end">
                <button
                    className="btn btn-primary"
                    onClick={handleNextStep}
                    disabled={!videoTitle || !uploadedVideo}
                >
                    Next: Select Fencers
                </button>
            </div>
        </div>
    )
}