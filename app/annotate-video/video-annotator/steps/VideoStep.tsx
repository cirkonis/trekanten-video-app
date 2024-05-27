import {useVideoStore} from "@/state/videoState";
import React, {useState} from "react";
import {useStepStore} from "@/state/annotationStepsState";
import {EVideoStatus} from "@/enums/EVideoStatus";
import {createDraftVideoData} from "@/lib/firestore/draft-videos/createVideo";
import {EVideoDraftStatus} from "@/enums/EVideoDraftStatus";
import YouTubePlayer from "@/components/YouTubePlayer";
import {Video} from "@/types/video";
import {getDraftVideoData} from "@/lib/firestore/draft-videos/getVideos";
import {updateDraftVideoData} from "@/lib/firestore/draft-videos/updateVideo";


export function VideoStep() {
    const videoTitle = useVideoStore((state) => state.title);
    const newVidDocId = useVideoStore.getState().youtubeVideoId;
    const setStep = useStepStore((state) => state.setCurrentStep);
    const [status, setStatus] = useState<EVideoStatus | null>(null);
    const youtubeVideoId = useVideoStore((state) => state.youtubeVideoId); // Get youtubeVideoId

    const setVideoTitle = (title: string) => {
        useVideoStore.getState().setTitle(title);
    }

    const handleNextStep = async () => {
        if (videoTitle) {
            setStatus(EVideoStatus.SAVING_DRAFT);
            const videoData: Video = {
                id: newVidDocId,
                title: useVideoStore.getState().title,
                leftFencer: useVideoStore.getState().leftFencer,
                rightFencer: useVideoStore.getState().rightFencer,
                touches: useVideoStore.getState().touches,
                youtubeVideoId: useVideoStore.getState().youtubeVideoId,
                youtubeUrl: `https://www.youtube.com/watch?v=${useVideoStore.getState().youtubeVideoId}`,
                draftStatus: EVideoDraftStatus.DRAFT_SAVED,
                club: useVideoStore.getState().club,
            }
            try {
                const videoExist = await getDraftVideoData(String(newVidDocId));
                console.log(videoExist);
                if(videoExist === null) {
                    console.log('doesnt exist, creating')
                    await createDraftVideoData(videoData);
                } else{
                    console.log('exist and updating')
                    await updateDraftVideoData(videoData)
                }
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
            {youtubeVideoId && youtubeVideoId != "" && ( // Conditional rendering based on youtubeVideoId
                <div className="w-full flex flex-col justify-evenly items-center my-8 p-16 min-h-[500px]">
                    <YouTubePlayer videoId={String(youtubeVideoId)}></YouTubePlayer>
                </div>
            )}
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