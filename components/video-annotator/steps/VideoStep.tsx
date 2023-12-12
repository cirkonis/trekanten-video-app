import {useVideoStore} from "@/state/videoState";
import React from "react";
import Player from "react-player";
import {Simulate} from "react-dom/test-utils";
import playing = Simulate.playing;
import {useStepStore} from "@/state/annotationStepsState";

export function VideoStep(){
    const uploadedVideo = useVideoStore((state) => state.url);
    const setUploadedVideo = useVideoStore((state) => state.setUploadedVideo);
    const playerRef = useVideoStore((state) => state.playerRef);
    const videoTitle = useVideoStore((state) => state.title);
    const setStep = useStepStore((state) => state.setCurrentStep);

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
                   id="video-title"
                   className="input input-bordered w-full max-w-xs"
                   value={videoTitle}
                   onChange={(e) => setVideoTitle(e.target.value)}
                   required
            />
            </div>
            <div className="border border-pink-500 border-2 w-full flex flex-col flex-grow justify-end items-center my-8 p-16 min-h-[500px]">
            {uploadedVideo && (
                <div>
                    <Player
                        ref={playerRef}
                        url={uploadedVideo}
                        onPlaying={playing}
                        controls={true}
                    />
                </div>
            )}
            <input
                type="file"
                accept="video/*"
                className="file-input file-input-bordered w-full max-w-xs"
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