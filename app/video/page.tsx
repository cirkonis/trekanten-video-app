'use client'


import React, {useState} from "react";
import Player from "react-player";
import {IAction} from "@/interfaces/IAction";
import {IFencer} from "@/interfaces/IFencer";
import {EActions} from "@/enums/EActions";
import {EPosition} from "@/enums/EPosition";
import Select from "react-select";
import {ETouche} from "@/enums/ETouche";

export default function Video() {
    const playerRef = React.createRef();
    const [playing, setPlaying] = useState(false);
    const [video, setVideo] = useState<string | null>(null);
    const [leftFencer, setLeftFencer] = useState<IFencer>({
        name: 'left fencer'
    })
    const [rightFencer, setRightFencer] = useState<IFencer>({
        name: 'right fencer'
    })
    const [actions, setActions] = useState<IAction[]>([]); // Array to store actions
    const [actionData, setActionData] = useState<IAction>({
        fencerLeft: leftFencer,
        fencerRight: rightFencer,
        touchAwardedTo: ETouche.NO_TOUCH,
        actionSequence: [],
        actionStartTime: 0,
        actionEndTime: 0,
        fencingStartTime: 0,
        fencingEndTime: 0,
        position: EPosition.BOX_CENTER
    });
    const [timestamp, setTimestamp] = useState(0);
    const [showFencingTime, setShowFencingTime] = useState(false); // Add this state

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = e.target.files[0];
        setVideo(URL.createObjectURL(file));
    };
    const handlePause = () => {
        if (playerRef.current) {
            // @ts-ignore
            const currentTime = playerRef.current.getCurrentTime();
            setTimestamp(currentTime); // Update the timestamp when the video is paused
        }
    };

    const handleSetActionStartTime = () => {
        setActionData((prevState) => ({...prevState, actionStartTime: timestamp}));
    };

    const handleSetActionEndTime = () => {
        setActionData((prevState) => ({...prevState, actionEndTime: timestamp}));
    };

    function formatTime(timeInSeconds: number) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function parseTime(timeString: string) {
        const [minutes, seconds] = timeString.split(':').map((part) => parseInt(part, 10));
        if (!isNaN(minutes) && !isNaN(seconds)) {
            return minutes * 60 + seconds;
        }
        return 0; // Return 0 if the input is not in mm:ss format
    }


    // @ts-ignore
    const handleJumpToTimestamp = (timestamp) => {
        // @ts-ignore
        if (playerRef.current && playerRef.current.seekTo) {
            // @ts-ignore
            playerRef.current.seekTo(timestamp);
        }
    };
    // @ts-ignore
    const handleAddAction = (e) => {
        e.preventDefault();
        setActions([...actions, actionData]);
        setActionData({
            fencerLeft: leftFencer,
            fencerRight: rightFencer,
            touchAwardedTo: actionData.touchAwardedTo,
            actionSequence: actionData.actionSequence,
            actionStartTime: actionData.actionStartTime,
            fencingStartTime: actionData.fencingStartTime,
            fencingEndTime: actionData.fencingEndTime,
            position: actionData.position
        });
    };

    return (
        <div>
            <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
            />

            {video && (
                <div>
                    <Player
                        // @ts-ignore
                        ref={playerRef}
                        url={video}
                        playing={playing}
                        controls={true}
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                        onProgress={handlePause}
                    />
                </div>
            )}
            <div>
                <form onSubmit={handleAddAction}>
                    {/*LEFT FENCER*/}
                    <div className="text-blue-600">
                        <input
                            type="text"
                            placeholder="Left Fencer"
                            value={leftFencer.name}
                            onChange={(e) => setLeftFencer({...leftFencer, name: e.target.value})}
                            required
                        />
                    </div>
                    {/*RIGHT FENCER*/}
                    <div className="text-blue-600">
                        <input
                            type="text"
                            placeholder="Right Fencer"
                            value={rightFencer.name}
                            onChange={(e) => setRightFencer({...rightFencer, name: e.target.value})}
                            required
                        />
                    </div>
                    {/*ACTION SEQUENCE*/}
                    <div className="text-blue-600">
                        <Select
                            isMulti
                            placeholder="Select Actions"
                            options={Object.values(EActions).map((action) => ({
                                value: action,
                                label: action,
                            }))}
                            value={actionData.actionSequence.map((action) => ({
                                value: action,
                                label: action,
                            }))}
                            onChange={(selectedOptions) => {
                                setActionData({
                                    ...actionData,
                                    actionSequence: selectedOptions.map((option) => option.value)
                                });
                            }}
                        />
                    </div>
                    {/*TOUCH AWARDED*/}
                    <div className="text-blue-600">
                        <Select
                            placeholder="Touch awarded to..."
                            options={Object.values(ETouche).map((touch) => ({
                                value: touch,
                                label: touch,
                            }))}
                            value={{
                                value: actionData.touchAwardedTo,
                                label: actionData.touchAwardedTo,
                            }}
                            onChange={(selectedOption) => {
                                // @ts-ignore
                                setActionData({...actionData, touchAwardedTo: selectedOption.value as ETouche});
                            }}
                        />
                    </div>
                    {/*POSITION*/}
                    <div className="text-blue-600">
                        <Select
                            placeholder="Select Position"
                            options={Object.values(EPosition).map((position) => ({
                                value: position,
                                label: position,
                            }))}
                            value={{
                                value: actionData.position,
                                label: actionData.position,
                            }}
                            onChange={(selectedOption) => {
                                // @ts-ignore
                                setActionData({...actionData, position: selectedOption.value as EPosition});
                            }}
                        />
                    </div>
                    {/* TOGGLE BUTTON for FENCING TIME */}
                    <div className="text-blue-600">
                        <button onClick={() => setShowFencingTime(!showFencingTime)}>
                            {showFencingTime ? "Hide Fencing Time" : "Show Fencing Time"}
                        </button>
                    </div>
                    {/* CONDITIONAL RENDERING for FENCING TIME */}
                    {showFencingTime && (
                        <div>
                            <div className="text-blue-600">
                                <label>Fencing Start Time (mm:ss)</label>
                                <input
                                    type="text"
                                    placeholder="Fencing Start Time (mm:ss)"
                                    value={formatTime(actionData.fencingStartTime)}
                                    onChange={(e) => setActionData({ ...actionData, fencingStartTime: parseTime(e.target.value) })}
                                    required
                                />
                            </div>
                            <div className="text-blue-600">
                                <label>Fencing End Time (mm:ss)</label>
                                <input
                                    type="text"
                                    placeholder="Fencing End Time (mm:ss)"
                                    value={formatTime(actionData.fencingEndTime || 0)}
                                    onChange={(e) => setActionData({ ...actionData, fencingEndTime: parseTime(e.target.value) })}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/*ACTION TIME STAMP*/}
                    <div>
                        <div className="flex flex-col">
                            <div>
                                Current Timestamp: {timestamp.toFixed(2)} seconds
                            </div>
                            <div>Action Start Time: {actionData.actionStartTime}</div>
                            <div>Action End Time: {actionData.actionEndTime}</div>
                            <div className="mb-4">
                                <button className="btn btn-secondary mx-2" type="button" onClick={handleSetActionStartTime}>
                                    Set Action Start Time to Current Timestamp
                                </button>
                                <button className="btn btn-secondary mx-2" type="button" onClick={handleSetActionEndTime}>
                                    Set Action End Time to Current Timestamp
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Add Action</button>
                    </div>
                </form>
            </div>
            <div>
                <p>Actions:</p>
                <ul>
                    {actions.map((action, index) => (
                        <li key={index}>
                            <button onClick={() => handleJumpToTimestamp(
                                // @ts-ignore
                                action.actionStartTime)}>
                                Jump to {
                                // @ts-ignore
                                action.actionStartTime} seconds
                            </button>
                            - {
                            // @ts-ignore
                            action.actionSequence} by {action.touchAwardedTo} at {action.position}
                        </li>
                    ))}
                </ul>
            </div>
        </div>


    );
}
