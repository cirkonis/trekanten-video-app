
'use client'

import {useEffect, useState} from "react";
import {useUserStore} from "@/state/usersState";

export default function UnprocessedVids() {
    const [unprocessedVideos, setUnprocessedVideos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUnprocessedVIds = async () => {
        const accessToken = useUserStore.getState().token;

        try {
            if (accessToken === null) {
                throw new Error('No access token found, Sign in to access this page');
            }

            const res = await fetch('/api/tube/unprocessed', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            })

            if(!res.ok) {
                throw new Error('Failed to fetch unprocessed videos');
            }

            const data = await res.json();
            setUnprocessedVideos(data);

        } catch (error) {
            console.error("Error getting unprocessed videos:", error);
        }
        finally {
            return true;
        }

    }


    useEffect(() => {
        getUnprocessedVIds().then(r => setLoading(false));
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Unprocessed Videos</h1>
            <pre>{JSON.stringify(unprocessedVideos, null, 2)}</pre>
        </div>
    );
};

