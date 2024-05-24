import {formatTime} from "@/utils/FormatTime";
import {ETouchTypes} from "@/enums/ETouchTypes";
import React, {useState} from "react";
import {useVideoStore} from "@/state/videoState";
import {useStepStore} from "@/state/annotationStepsState";
import {Fencer} from "@/types/fencer";
import {FencingTouch} from "@/types/fencingTouch";
import {EVideoStatus} from "@/enums/EVideoStatus";
import {Spinner} from "@/components/Spinner";
import {useUserStore} from "@/state/usersState";
import {AlertMessage} from "@/components/AlertMessage";
import Link from "next/link";
import {updateVideoData} from "@/lib/firestore/videos/updateVideo";
import {EVideoDraftStatus} from "@/enums/EVideoDraftStatus";

export function SubmitStep() {
    const videoTitle = useVideoStore((state) => state.title);
    const leftFencer = useVideoStore((state) => state.leftFencer);
    const rightFencer = useVideoStore((state) => state.rightFencer);
    const setStep = useStepStore((state) => state.setCurrentStep);
    const [status, setStatus] = useState<EVideoStatus>(EVideoStatus.NEW);
    const [showAlert, setShowAlert] = useState(false);

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    function compareTimes(timeA: number, timeB: number): number {
        return timeA - timeB;
    }

    const touches = useVideoStore((state) => state.touches);

    const sortedTouches: any[] = [...touches].sort((a: any, b: any) => compareTimes(a.videoStartTimeStamp, b.videoStartTimeStamp));

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
            if (touch.pointAwardedTo.length > 0) {
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

    async function updateFencerPlaylist(fencer: Fencer, token: string) {
        const updateFencerPlaylist = await fetch(`/api/tube/playlist`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({playlistId: fencer.playlistId, videoId: useVideoStore.getState().youtubeVideoId}),
        });

        if (!updateFencerPlaylist.ok) {
            throw new Error(`Failed to update ${fencer.name} playlist`);
        }

    }

    async function updateVideo(token: string) {
        const videoMetaData = {
            id: useVideoStore.getState().youtubeVideoId,
            title: useVideoStore.getState().title,
            description: formatYouTubeDescription(useVideoStore.getState().touches),
            videoId: useVideoStore.getState().youtubeVideoId,
        }

        const updateVideo = await fetch(`/api/tube/video`, {
            method: 'PUT',
            headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify(videoMetaData),
        });

        if (!updateVideo.ok) {
            throw new Error('Failed to update video');
        }
    }

    async function removeVideoFromPLaylist(videoId: string, token: string) {
        const playlistId = 'PLgDEtyTQ47rJAh0vMOchK4tNAxmf4wbGM';
        const removeVideo = await fetch(`/api/tube/playlist`, {
                method: 'DELETE',
                headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
                body: JSON.stringify({playlistId: playlistId, videoId: videoId}),
            }
        );
        if (!removeVideo.ok) {
            throw new Error('Failed to remove video from playlist');
        }
    }

    const finishVideo = async () => {
        try {
            setStatus(EVideoStatus.UPDATING_ON_YOUTUBE);
            const token = useUserStore.getState().token;
            if (!token) {
                setShowAlert(true);
                useUserStore.getState().setLoggedIn(false);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
                throw new Error('User not logged in');
            }

            await updateVideo(token);
            await updateFencerPlaylist(leftFencer, token);
            await updateFencerPlaylist(rightFencer, token);
            await removeVideoFromPLaylist(String(useVideoStore.getState().youtubeVideoId), token);
            setStatus(EVideoStatus.UPDATED_ON_YOUTUBE);
            setStatus(EVideoStatus.FINALIZING);
            const videoData = {
                id: useVideoStore.getState().id,
                title: useVideoStore.getState().title,
                leftFencer: useVideoStore.getState().leftFencer,
                rightFencer: useVideoStore.getState().rightFencer,
                touches: useVideoStore.getState().touches,
                youtubeUrl: `https://www.youtube.com/watch?v=${useVideoStore.getState().youtubeVideoId}`,
                draftStatus: EVideoDraftStatus.FINALIZED,
                club: useVideoStore.getState().club,
            }
            try {
                await updateVideoData(videoData);
                setStatus(EVideoStatus.FINALIZED);
            } catch (e) {
                setStatus(EVideoStatus.FAILED_TO_SAVE_DRAFT);
                console.error("Error saving draft:", e);
            }
            useVideoStore.getState().resetVideo();
            const modal = document.getElementById('video-success-modal');
            if (modal) {
                // @ts-ignore
                modal.showModal();
            }else {
                console.error("Modal element not found in DOM");
            }
        } catch (error) {
            setStatus(EVideoStatus.FAILED_TO_UPDATE_YOUTUBE);
            console.error("Error updating video on you tube:", error);
            const modal = document.getElementById('video-failed-modal');
            if (modal) {
                // @ts-ignore
                modal.showModal();
            } else {
                console.error("Modal element not found in DOM");
            }
        }
    }

    const handleSave = async () => {
        const modal = document.getElementById('create-video-modal');
        if (modal) {
            // @ts-ignore
            modal.showModal();
        }
    };


    const handleConfirmSave = async () => {
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
                    Update Everything on YouTube 🚀 📺
                </button>
                <dialog id="create-video-modal" className="modal">
                    <div className="modal-box flex flex-col w-full items-center">
                        <h3 className="font-bold text-lg">
                            {status === EVideoStatus.UPDATING_ON_YOUTUBE ? "Kick back, relax, we'll let you know if it works 🍻" :
                                <div className="flex flex-col justify-center items-center">
                                    <div>Are you sure 🤔</div>
                                    <div className="text-sm text-center">We will remove this video from the unprocessed
                                        list and add it to each Fencer's playlist
                                    </div>
                                </div>
                            }
                        </h3>
                        {status === EVideoStatus.UPDATING_ON_YOUTUBE ? <Spinner></Spinner> :
                            <div className="divider"></div>}
                        <div className="modal-action flex w-full justify-between">
                            <form method="dialog">
                                <button
                                    hidden={status === EVideoStatus.UPDATING_ON_YOUTUBE}
                                    disabled={status === EVideoStatus.UPDATING_ON_YOUTUBE}
                                    className="btn btn-danger">Nope
                                </button>
                            </form>
                            <button
                                disabled={status === EVideoStatus.UPDATING_ON_YOUTUBE}
                                className="btn btn-accent"
                                onClick={() => handleConfirmSave()}>
                                {status === EVideoStatus.UPDATING_ON_YOUTUBE ? "Uploading to the tube 📺 🤺..." : "Finish Video"}
                            </button>
                        </div>
                    </div>
                </dialog>
                {/* UPLOAD SUCCESSFUL */}
                <dialog id="video-success-modal" className="modal">
                    <div className="modal-box flex flex-col w-full items-center">
                        <h3 className="font-bold text-lg">
                            "WE DID IT!!! 🎉🎉🎉"
                        </h3>
                        <div className="modal-action flex w-full justify-center">
                            <Link
                                href="/"
                                className="btn btn-accent"
                            >
                                Start Over 🤺
                            </Link>
                        </div>
                    </div>
                </dialog>
                {/* UPLOAD FAILED MODAL */}
                <dialog id="video-failed-modal" className="modal">
                    <div className="modal-box flex flex-col w-full items-center">
                        <h3 className="font-bold text-lg">
                            It did not work 😡
                        </h3>
                        <div className="modal-action flex w-full justify-center">
                            <form method="dialog">
                                <button
                                    className="btn btn-error">Damn it...
                                </button>
                            </form>
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
            <div>
                {showAlert && <AlertMessage alertMessage="Not logged in!" onClose={handleCloseAlert}/>}
            </div>
        </div>
    )
}