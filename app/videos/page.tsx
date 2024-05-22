'use client'

import {useEffect, useState} from "react";
import YouTubePlayer from "@/components/YouTubePlayer";
import UnprocessedVids from "@/app/videos/UnprocessedVids";

export default function Videos() {
    const [videoId, setVideoId] = useState('y1ipNWV6DIE');

    useEffect(() => {
        // Optionally, fetch the video ID dynamically from an API or other source
        // Example static video ID for demonstration
        // setVideoId('dQw4w9WgXcQ'); // Uncomment to set a different video ID
    }, []);

    return (
        <div>
            <h1>My YouTube App</h1>
            {/*<YouTubePlayer videoId={videoId} />*/}
            <UnprocessedVids />
        </div>
    );
};
