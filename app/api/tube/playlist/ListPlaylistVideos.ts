import {google} from 'googleapis';
import {OAuth2Client} from 'google-auth-library';
import {InternalError} from "@/app/api/_Error-Handlers/InternalError";

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID as string;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET as string;
const REDIRECT_URI = process.env.REDIRECT_URI;

export async function ListPlaylistVideos(accessToken: string, id: string) {
    try {
        // Create OAuth2 client
        const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

        oAuth2Client.setCredentials({access_token: accessToken});
        const youtube = google.youtube({
            version: 'v3',
            auth: oAuth2Client,
        });

        const res = await youtube.playlistItems.list({
            part: ['id', 'snippet', 'status'],
            playlistId: id,
        });

        if(res.status === 401) {
            return new Response(JSON.stringify({error: 'Unauthorized'}), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        return new Response(JSON.stringify(res), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching videos from playlist', error);
        return InternalError(error);
    }
}
