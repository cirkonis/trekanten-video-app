'use client'

import React, { useEffect, useRef } from 'react';
import {useTouchStore} from "@/state/touchState";

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

interface YouTubePlayerProps {
    videoId: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
    const playerRef = useRef<HTMLDivElement | null>(null);
    const playerInstance = useRef<any>(null);
    const done = useRef(false);
    const touchStartTime = useTouchStore(state => state.videoStartTimeStamp);

    const getCurrentTime = () => {
        if (playerInstance.current) {
            const time = playerInstance.current.getCurrentTime();
            const currentTime = Math.round(time);
            useTouchStore.getState().setVideoStartTimeStamp(currentTime);
            console.log(useTouchStore.getState().videoStartTimeStamp);
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
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange,
                },
            });
        };

        const onPlayerReady = (event: any) => {
            event.target.playVideo();
        };

        const onPlayerStateChange = (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING && !done.current) {
                setTimeout(stopVideo, 6000);
                done.current = true;
            }
        };

        const stopVideo = () => {
            playerInstance.current.stopVideo();
        };

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
            <button onClick={getCurrentTime}>Get Current Time</button>
            <p>{useTouchStore.getState().videoStartTimeStamp}</p>
        </div>
    );
};

export default YouTubePlayer;