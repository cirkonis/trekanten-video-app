import {formatTime} from "@/utils/FormatTime";
import {ETouchTypes} from "@/enums/ETouchTypes";
import React, {useState} from "react";
import {useVideoStore} from "@/state/videoState";
import {useStepStore} from "@/state/annotationStepsState";
import {Fencer} from "@/types/fencer";
import {FencingTouch} from "@/types/fencingTouch";
import {EVideoStatus} from "@/enums/EVideoStatus";
import {updateVideoData} from "@/lib/firestore/videos/updateVideo";
import {EVideoDraftStatus} from "@/enums/EVideoDraftStatus";
import {Spinner} from "@/components/Spinner";
import {uploadVideoToYouTube} from "@/lib/youtube/uploadVideoToYouTube";

export function SubmitStep() {
    const videoTitle = useVideoStore((state) => state.title);
    const leftFencer = useVideoStore((state) => state.leftFencer);
    const rightFencer = useVideoStore((state) => state.rightFencer);
    const setStep = useStepStore((state) => state.setCurrentStep);
    const video = useVideoStore((state) => state);
    const [saving, setSaving] = useState<boolean>(false);
    const [status, setStatus] = useState<EVideoStatus | null>(null);

    function compareTimes(timeA: number, timeB: number): number {
        return timeA - timeB;
    }

    const touches = useVideoStore((state) => state.touches);

    const sortedTouches = [...touches].sort((a, b) => compareTimes(a.videoStartTimeStamp, b.videoStartTimeStamp));

    function handleBackButton() {
        setStep(2);
    }

    function formatYouTubeDescription(touches: FencingTouch[]): string {
        let description = "Timestamps\n";

        // Start with the initial timestamp
        description += "00:00 Start\n";

        // Loop through each touch data
        touches.forEach((touch, index) => {
            // Get the timestamp and format it
            const timestamp = touch.videoStartTimeStamp;
            const minutes = Math.floor(timestamp / 60);
            const seconds = timestamp % 60;
            const formattedTimestamp = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            // Get the action sequence
            const sequence = touch.sequence.join(", ");

            // Get the fencer name
            let fencerName: string;
            if(touch.pointAwardedTo.length > 0) {
                fencerName = touch.pointAwardedTo[0].name;
            } else {
                fencerName = "No one";
            }

            // Construct the touch description
            const touchDescription = `${formattedTimestamp} ${sequence} to ${fencerName}\n`;

            // Append the touch description to the overall description
            description += touchDescription;
        });

        return description;
    }

    const finishVideo = async () => {
        const videoTitle = useVideoStore.getState().title;
        const videoFileUrl = useVideoStore.getState().url;
        try {
            // @ts-ignore
            const response = await fetch(videoFileUrl);
            const blob = await response.blob();
            const description = formatYouTubeDescription(useVideoStore.getState().touches as FencingTouch[]);

            // Create FormData object to send both title and file
            const formData = new FormData();
            formData.append('title', videoTitle);
            formData.append('description', description);
            formData.append('file', blob as Blob);


        //     // Make your API call to upload the video
        //     await fetch('/api/tube', {
        //         method: 'POST',
        //         body: formData,
        //     })
        //         .then((res) => res.json())
        //         .then((data) => {
        //             console.log('Success:', data);
        //         })
        //         .catch(() => {
        //             console.error("Error uploading video");
        //         });
        } catch (error) {
            console.error("Error uploading video:", error);
        }
        setStatus(EVideoStatus.UPLOADED_TO_YOUTUBE);
        // temprorary setting you tube url to chanel=
        //TODO get video url back from http call and set that here
        const youtubeUrl = 'https://www.youtube.com/watch?v=123456789';
        const videoDataToUpdate = {
            id: useVideoStore.getState().id,
            youtubeUrl: youtubeUrl,
            draftStatus: EVideoDraftStatus.NO_LONGER_A_DRAFT,
        }
        await updateVideoData(videoDataToUpdate);
    };

    const handleSave = async () => {
        const modal = document.getElementById('create-video-modal');
        if (modal) {
            // @ts-ignore
            modal.showModal();
        }
    };


    const handleConfirmSave = async () => {
        setStatus(EVideoStatus.UPLOADING_TO_YOUTUBE);
        await finishVideo();
    };

    return (
        <div>
            <div className=" flex w-full justify-evenly mb-4">
                <button
                    onClick={handleBackButton}
                    className="btn btn-secondary">
                    Back
                </button>
                <button
                    onClick={() => handleSave()}
                    className="btn btn-primary">
                    Save Video
                </button>
                <dialog id="create-video-modal" className="modal">
                    <div className="modal-box flex flex-col w-full items-center">
                        <h3 className="font-bold text-lg">
                            {status === EVideoStatus.UPLOADING_TO_YOUTUBE ? "Kick back, relax, we'll let you know if it works 🍻" : "Are you sure 🤔"}
                        </h3>
                        {status === EVideoStatus.UPLOADING_TO_YOUTUBE ? <Spinner></Spinner> : <div className="divider"></div>}
                        <div className="modal-action flex w-full justify-between">
                            <form method="dialog">
                                <button
                                    hidden={status === EVideoStatus.UPLOADING_TO_YOUTUBE}
                                    disabled={status === EVideoStatus.UPLOADING_TO_YOUTUBE}
                                    className="btn btn-danger">Nope</button>
                            </form>
                            <button
                                disabled = {status === EVideoStatus.UPLOADING_TO_YOUTUBE}
                                className="btn btn-accent"
                                onClick={() => handleConfirmSave()}>
                                {status === EVideoStatus.UPLOADING_TO_YOUTUBE ? "Uploading to the tube 📺 🤺..." : "Finish Video"}
                            </button>
                        </div>
                    </div>
                </dialog>
            </div>
            <h1 className="text-2xl font-semibold px-8 mb-2">Video:
                <span className="font-normal text-xl ml-2">{videoTitle}</span></h1>
            <h1 className="text-2xl font-semibold px-8 mb-2">Fencers:
                <span className="font-normal text-xl ml-2">{leftFencer.name} & {rightFencer.name}</span></h1>
            {/* TOUCHES LIST */}
            <div>
                <h1 className="text-2xl font-semibold px-8 mb-2">Touches</h1>
                <div className="px-10">
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
                            </div>
                            <div className="divider w-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
)
}