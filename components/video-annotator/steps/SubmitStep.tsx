import {formatTime} from "@/utils/FormatTime";
import {ETouchTypes} from "@/enums/ETouchTypes";
import React, {useState} from "react";
import {useVideoStore} from "@/state/videoState";
import {useStepStore} from "@/state/annotationStepsState";
import {router} from "next/client";

export function SubmitStep() {
    const videoTitle = useVideoStore((state) => state.title);
    const leftFencer = useVideoStore((state) => state.leftFencer);
    const rightFencer = useVideoStore((state) => state.rightFencer);
    const setStep = useStepStore((state) => state.setCurrentStep);
    const video = useVideoStore((state) => state);
    const [saving, setSaving] = useState<boolean>(false);

    function compareTimes(timeA: number, timeB: number): number {
        return timeA - timeB;
    }

    const touches = useVideoStore((state) => state.touches);

    const sortedTouches = [...touches].sort((a, b) => compareTimes(a.videoStartTimeStamp, b.videoStartTimeStamp));

    function handleBackButton() {
        setStep(2);
    }

    const handleSave = async () => {
        const modal = document.getElementById('create-video-modal');
        if (modal) {
            // @ts-ignore
            modal.showModal();
        }
    };

    const handleConfirmSave = async () => {
        const { id, club, title, leftFencer, rightFencer, touches } = video;
        setSaving(true);
        // TODO MM 12/23 add dynamic clubID
        try {
            // Make your API call to create a new fencer
            await fetch('/api/videos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    club,
                    title,
                    leftFencer,
                    rightFencer,
                    touches
                })
            })
                .then((res) => res.json())
                .then(() =>  useVideoStore.getState().resetVideo())
                .then(() => setSaving(false))
                .then(() => setStep(0))
                .catch(() => {
                    console.error("Error saving video")
                });
        } catch (error) {
            console.error("Error saving video:", error);
            setSaving(false);
            const modal = document.getElementById('create-video-modal');
            if (modal) {
                // @ts-ignore
                modal.close(); // Close the modal
            }
        } finally {
            setSaving(false);
            const modal = document.getElementById('create-video-modal');
            if (modal) {
                // @ts-ignore
                modal.close(); // Close the modal
            }
        }
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
                    <div className="modal-box flex flex-col w-full">
                        <h3 className="font-bold text-lg">Are you sure?</h3>
                        <div className="modal-action flex w-full justify-between">
                            <form method="dialog">
                                <button className="btn btn-danger">Nope</button>
                            </form>
                            <button className="btn btn-accent" onClick={() => handleConfirmSave()}>
                                {saving ? "Saving..." : "Save Video"}
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
                            </div>
                            <div className="divider w-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
)
}