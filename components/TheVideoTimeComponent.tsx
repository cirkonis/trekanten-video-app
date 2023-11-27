import Player from "react-player";
import React, {useEffect, useState} from "react";
import {useTouchStore} from "@/state/touchState";
import {Time} from "@/types/time";
import {FencingTime} from "@/components/FencingTime";
const playerRef = React.createRef();

export function TheVideoTimeComponent(){
    const [playing, setPlaying] = useState(false);
    const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
    // Use local state for timestamps to immediately reflect changes
    const [touchStartTime, setTouchStartTime] = useState<{ minutes: number; seconds: number }>({ minutes: 0, seconds: 0 });
    const [touchEndTime, setTouchEndTime] = useState<{ minutes: number; seconds: number } | null>(null);
    const [showEndTime, setShowEndTime] = useState(false);

    useEffect(() => {
        // @ts-ignore
        const handleProgress = (state) => {
            if (playing) {
                // Update timestamp when video is playing
                useTouchStore.getState().setVideoStartTimeStamp({
                    minutes: Math.floor(state.playedSeconds / 60),
                    seconds: Math.floor(state.playedSeconds % 60)
                });
            }
        };

        // Subscribe to the onProgress event to detect the playing state
        if (playerRef.current) {
            // @ts-ignore
            const player = playerRef.current.getInternalPlayer('video');
            if (player) {
                player.addEventListener('progress', handleProgress);
            }
        }

        return () => {
            // Unsubscribe when the component unmounts
            if (playerRef.current) {
                // @ts-ignore
                const player = playerRef.current.getInternalPlayer('video');
                if (player) {
                    player.removeEventListener('progress', handleProgress);
                }
            }
        };
    }, [playing]);

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null && e.target.files.length > 0) {
            setUploadedVideo(URL.createObjectURL(e.target.files[0]));
        } else {
            // TODO: Handle error
            console.log('Error uploading video');
        }
    };

    function formatTime(time: Time) {
        const minutes = Math.floor(time.minutes / 60);
        const seconds = Math.floor(time.seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }




    const handleSetStartTime = () => {
        if (playerRef.current) {
            const currentTime = (playerRef.current as any).getCurrentTime();
            setTouchStartTime({
                minutes: Math.floor(currentTime / 60),
                seconds: Math.floor(currentTime % 60)
            });
            useTouchStore.getState().setVideoStartTimeStamp({
                minutes: Math.floor(currentTime / 60),
                seconds: Math.floor(currentTime % 60)
            });
        }
    };

    const handleSetEndTime = () => {
        if (playerRef.current) {
            const currentTime = (playerRef.current as any).getCurrentTime();
            const newTimeStamp = {
                minutes: Math.floor(currentTime / 60),
                seconds: Math.floor(currentTime % 60)
            };
            useTouchStore.getState().setVideoEndTimeStamp(newTimeStamp);
            setTouchEndTime(newTimeStamp);
        }
    };


    return(
        <div>
            <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
            />

            {uploadedVideo && (
                <div>

                    <Player
                        // @ts-ignore
                        ref={playerRef}
                        url={uploadedVideo}
                        playing={playing}
                        controls={true}
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                    />
                </div>
            )}
            <div className="flex flex-col my-4">
                <div className="flex items-center">
                    <button className="btn btn-accent btn-sm mx-4" onClick={handleSetStartTime}>Set Start Time</button>
                    <div>Start Time - </div>
                    <div className="text-xl mx-2">{formatTime(touchStartTime)} </div>
                    {showEndTime && (
                        <>
                            <button className="btn btn-accent btn-sm mx-4" onClick={handleSetEndTime}>Set End Time</button>
                            <div>End Time - </div>
                            <div className="text-xl mx-2">{touchEndTime ? formatTime(touchEndTime) : formatTime(touchStartTime)}</div>
                        </>
                    )}
                    <label className="cursor-pointer label w-40">
                        <span className="label-text">Add End Time</span>
                        <input
                            type="checkbox"
                            className="toggle toggle-warning"
                            checked={showEndTime}
                            onChange={() => setShowEndTime(!showEndTime)}
                        />
                    </label>
                    <FencingTime/>
                </div>
            </div>
        </div>
    )
}