import {google} from 'googleapis';
import {OAuth2Client} from 'google-auth-library';
import {InternalError} from "@/app/api/_Error-Handlers/InternalError";

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID as string;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET as string;
const REDIRECT_URI = process.env.REDIRECT_URI;
const PLAYLIST_ID = process.env.UNPROCESSED_VIDEOS_PLAYLIST_ID as string;

export async function listUnprocessedVideos(accessToken: string) {
    try {
        // Create OAuth2 client
        const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

        oAuth2Client.setCredentials({access_token: accessToken});
        console.log("LOOOOK HERHEHEHRHEREREE" + oAuth2Client)
        const youtube = google.youtube({
            version: 'v3',
            auth: oAuth2Client,
        });

        const res = await youtube.playlistItems.list({
            part: ['id', 'snippet', 'status'],
               playlistId: PLAYLIST_ID,
        });

        console.log(JSON.stringify(res))

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
