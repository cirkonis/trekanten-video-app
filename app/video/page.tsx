'use client'

import React, { useState } from "react";
import Player from "react-player";

export default function Video() {
    const playerRef = React.createRef();
    const [playing, setPlaying] = useState(false);
    const [video, setVideo] = useState<string | null>(null);
    const [timestamps, setTimestamps] = useState<number[]>([]);
    const [actions, setActions] = useState([]); // Array to store actions
    const [actionData, setActionData] = useState({
        action: "",
        who: "",
        where: "",
        timestamp: 0,
    });

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = e.target.files[0];
        setVideo(URL.createObjectURL(file));
    };
    const handlePause = () => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
            const currentTime = playerRef.current.getCurrentTime();
            setActionData((prevState) => ({ ...prevState, timestamp: currentTime }));
        }
    };


    const handleJumpToTimestamp = (timestamp) => {
        if (playerRef.current && playerRef.current.seekTo) {
            playerRef.current.seekTo(timestamp);
        }
    };
    const handleAddAction = (e) => {
        e.preventDefault();
        setActions([...actions, actionData]);
        setActionData({
            action: "",
            who: "",
            where: "",
            timestamp: 0,
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
                        ref={playerRef}
                        url={video}
                        playing={playing}
                        controls={true}
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                        onProgress={handlePause}
                    />
                    {/*<div>*/}
                    {/*    <p>Timestamps:</p>*/}
                    {/*    <ul>*/}
                    {/*        {timestamps.map((timestamp, index) => (*/}
                    {/*            <li key={index}>*/}
                    {/*                <button*/}
                    {/*                    onClick={() => handleJumpToTimestamp(timestamp)}*/}
                    {/*                >*/}
                    {/*                    Jump to {timestamp} seconds*/}
                    {/*                </button>*/}
                    {/*            </li>*/}
                    {/*        ))}*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                </div>
            )}
            <div>
                <form onSubmit={handleAddAction}>
                    <div>
                        <input
                            type="text"
                            placeholder="Action"
                            value={actionData.action}
                            onChange={(e) => setActionData({ ...actionData, action: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Who"
                            value={actionData.who}
                            onChange={(e) => setActionData({ ...actionData, who: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Where"
                            value={actionData.where}
                            onChange={(e) => setActionData({ ...actionData, where: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Timestamp"
                            value={actionData.timestamp}
                            onChange={(e) =>
                                setActionData({ ...actionData, timestamp: parseFloat(e.target.value) })
                            }
                            required
                        />
                    </div>
                    <button type="submit">Add Action</button>
                </form>
            </div>
            <div>
                <p>Actions:</p>
                <ul>
                    {actions.map((action, index) => (
                        <li key={index}>
                            <button onClick={() => handleJumpToTimestamp(action.timestamp)}>
                                Jump to {action.timestamp} seconds
                            </button>
                            - {action.action} by {action.who} at {action.where}
                        </li>
                    ))}
                </ul>
            </div>
        </div>


);
}
