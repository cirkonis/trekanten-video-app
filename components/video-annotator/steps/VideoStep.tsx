import {useVideoStore} from "@/state/videoState";
import React, {useEffect, useRef, useState} from "react";
import Player from "react-player";
import {useStepStore} from "@/state/annotationStepsState";
import {EVideoStatus} from "@/enums/EVideoStatus";
import {v4 as uuidv4} from 'uuid';
import {createVideoData} from "@/lib/firestore/videos/createVideo";
import {EVideoDraftStatus} from "@/enums/EVideoDraftStatus";
import YouTubePlayer from "@/components/YouTubePlayer";


export function VideoStep() {
    const videoTitle = useVideoStore((state) => state.title);
    const newVidDocId = useVideoStore.getState().youtubeVideoId;
    const setStep = useStepStore((state) => state.setCurrentStep);
    const [status, setStatus] = useState<EVideoStatus | null>(null);


    const setVideoTitle = (title: string) => {
        useVideoStore.getState().setTitle(title);
    }

    const handleNextStep = async () => {
        if (videoTitle) {
            setStatus(EVideoStatus.SAVING_DRAFT);
            const videoData = {
                id: newVidDocId,
                title: useVideoStore.getState().title,
                leftFencer: useVideoStore.getState().leftFencer,
                rightFencer: useVideoStore.getState().rightFencer,
                touches: useVideoStore.getState().touches,
                youtubeUrl: useVideoStore.getState().youtubeUrl,
                draftStatus: EVideoDraftStatus.DRAFT_SAVED_WITH_NO_VIDEO,
                club: useVideoStore.getState().club,
            }
            try {
                await createVideoData(videoData);
                useVideoStore.getState().setVideoId(String(newVidDocId));
                setStatus(EVideoStatus.SAVED_DRAFT);
                setStep(1);
            } catch (e) {
                setStatus(EVideoStatus.FAILED_TO_SAVE_DRAFT);
                console.error("Error saving draft:", e);
            }
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
                       disabled={status === EVideoStatus.SAVING_DRAFT}
                       required
                />
            </div>
            <div className="w-full flex flex-col justify-evenly items-center my-8 p-16 min-h-[500px]">
                <YouTubePlayer videoId={String(useVideoStore.getState().youtubeVideoId)}></YouTubePlayer>
            </div>

            {/* Conditionally set the disabled attribute based on videoTitle and uploadedVideo */}
            <div className="px-8 flex w-full justify-end">
                <button
                    className="btn btn-primary"
                    onClick={handleNextStep}
                    disabled={!videoTitle || status === EVideoStatus.SAVING_DRAFT}
                >
                    {status === EVideoStatus.SAVING_DRAFT ? "Saving draft data 💾 🤺" : "Next: Select Fencers"}
                </button>
            </div>
        </div>
    )
}