'use client'

import React, {useEffect, useRef} from 'react';
import {useTouchStore} from "@/state/touchState";
import {useStepStore} from "@/state/annotationStepsState";
import {formatTime} from "@/utils/FormatTime";

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

interface YouTubePlayerProps {
    videoId: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({videoId}) => {
    const playerRef = useRef<HTMLDivElement | null>(null);
    const playerInstance = useRef<any>(null);
    // const done = useRef(false);
    const touchStartTime = useTouchStore(state => state.videoStartTimeStamp);

    const handleSetStartTime = () => {
        if (playerInstance.current) {
            const time = playerInstance.current.getCurrentTime();
            const currentTime = Math.round(time);
            useTouchStore.getState().setVideoStartTimeStamp(currentTime);
        }
    };


    useEffect(() => {
        const loadYouTubeIframeAPI = () => {
            if (window.YT) {
                initializePlayer();
                return;
            }

            const scriptTag = document.createElement('script');
            scriptTag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            // @ts-ignore
            firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);

            window.onYouTubeIframeAPIReady = initializePlayer;
        };

        const initializePlayer = () => {
            playerInstance.current = new window.YT.Player(playerRef.current, {
                height: '390',
                width: '640',
                videoId: videoId,
                playerVars: {
                    playsinline: 1,
                },
                // events: {
                //     onReady: onPlayerReady,
                //     onStateChange: onPlayerStateChange,
                // },
            });
        };

        // const onPlayerReady = (event: any) => {
        //     event.target.playVideo();
        // };
        //
        // const onPlayerStateChange = (event: any) => {
        //     if (event.data === window.YT.PlayerState.PLAYING && !done.current) {
        //         setTimeout(stopVideo, 6000);
        //         done.current = true;
        //     }
        // };
        //
        // const stopVideo = () => {
        //     playerInstance.current.stopVideo();
        // };

        loadYouTubeIframeAPI();

        return () => {
            if (playerInstance.current) {
                playerInstance.current.destroy();
            }
        };
    }, [videoId]);

    return (
        <div>
            <div ref={playerRef}></div>
            {useStepStore.getState().currentStep !== 2 ? (
                <p></p>
            ) : (
                <>
                    <div className="divider"></div>
                    <div className="flex justify-evenly">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex flex-row items-center mb-4">
                                <div>Touch start time:</div>
                                <div className="text-xl mx-2">{formatTime(touchStartTime)} </div>
                            </div>
                            <button className="btn btn-accent btn-lg mx-4" onClick={handleSetStartTime}>Set Touch Start
                                Time
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default YouTubePlayer;