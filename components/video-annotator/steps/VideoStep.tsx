import {useVideoStore} from "@/state/videoState";
import React, {useEffect, useRef, useState} from "react";
import Player from "react-player";
import {useStepStore} from "@/state/annotationStepsState";
import {EVideoStatus} from "@/enums/EVideoStatus";
import {v4 as uuidv4} from 'uuid';
import {createVideoData} from "@/lib/firestore/videos/createVideo";
import {EVideoDraftStatus} from "@/enums/EVideoDraftStatus";


export function VideoStep() {
    const uploadedVideo = useVideoStore((state) => state.url);
    const setUploadedVideo = useVideoStore((state) => state.setUploadedVideo);
    const videoTitle = useVideoStore((state) => state.title);
    const setStep = useStepStore((state) => state.setCurrentStep);
    const [status, setStatus] = useState<EVideoStatus | null>(null);

    const [uploadedFile, setUploadedFile] = useState<File | null>(null); // Local state for the uploaded file

    const playerRef = useRef<Player | null>(null);

    useEffect(() => {
        useVideoStore.getState().setPlayerRef(playerRef);
    }, []);


    const setVideoTitle = (title: string) => {
        useVideoStore.getState().setTitle(title);
    }

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null && e.target.files.length > 0) {
            const file = e.target.files[0];
            setUploadedVideo(URL.createObjectURL(file)); // Set the URL
            setUploadedFile(file); // Update the uploaded file state
            useVideoStore.getState().setFile(file);
        } else {
            // TODO: Handle error with at least alert message
            console.error('Error uploading video');
        }
    };

    const handleNextStep = async () => {
        if (videoTitle && uploadedVideo) {
            setStatus(EVideoStatus.SAVING_DRAFT);
            useVideoStore.getState().setVideoId(uuidv4());
            useVideoStore.getState().setBucketUrl(`videos/${useVideoStore.getState().id}/${useVideoStore.getState().title}`);
            const videoData = {
                id: useVideoStore.getState().id,
                title: useVideoStore.getState().title,
                leftFencer: useVideoStore.getState().leftFencer,
                rightFencer: useVideoStore.getState().rightFencer,
                touches: useVideoStore.getState().touches,
                bucketUrl: useVideoStore.getState().bucketUrl,
                youtubeUrl: 'Not yet uploaded',
                draftStatus: EVideoDraftStatus.DRAFT_SAVED_WITH_NO_VIDEO,
                club: useVideoStore.getState().club,
            }
            try {
                await createVideoData(videoData);
                setStatus(EVideoStatus.SAVED_DRAFT);
                setStep(1);
            } catch (e) {
                setStatus(EVideoStatus.FAILED_TO_SAVE_DRAFT);
                console.error("Error saving draft:", e);
            }
        }
    };

    // TODO: Move this to a separate file
    //     THIS IS THE UPLOAD TO YOUTUBE CODE, MOVE IT PLEASE    //

    // const uploadVideo = async () => {
    //     const videoTitle = useVideoStore.getState().title;
    //     const videoFileUrl = useVideoStore.getState().url;
    //
    //     try {
    //         // @ts-ignore
    //         const response = await fetch(videoFileUrl);
    //         const blob = await response.blob();
    //
    //         // Create FormData object to send both title and file
    //         const formData = new FormData();
    //         formData.append('title', videoTitle);
    //         formData.append('description', "A video uploaded from the Fencing Time app");
    //         formData.append('file', blob as Blob);
    //
    //         // Make your API call to upload the video
    //         await fetch('/api/tube', {
    //             method: 'POST',
    //             body: formData,
    //         })
    //             .then((res) => res.json())
    //             .catch(() => {
    //                 console.error("Error uploading video");
    //             });
    //     } catch (error) {
    //         console.error("Error uploading video:", error);
    //     }
    // }


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
                            onPlaying={() => {
                            }}
                            controls={true}
                        />
                    </div>
                )}
                <input
                    type="file"
                    accept="video/*"
                    className="mt-6 file-input file-input-bordered w-full max-w-xs"
                    disabled={status === EVideoStatus.SAVING_DRAFT}
                    onChange={handleVideoUpload}
                />
            </div>
            {/* Conditionally set the disabled attribute based on videoTitle and uploadedVideo */}
            <div className="px-8 flex w-full justify-end">
                <button
                    className="btn btn-primary"
                    onClick={handleNextStep}
                    disabled={!videoTitle || !uploadedVideo || status === EVideoStatus.SAVING_DRAFT}
                >
                    {status === EVideoStatus.SAVING_DRAFT ? "Saving draft data 💾 🤺" : "Next: Select Fencers"}
                </button>
            </div>
        </div>
    )
}