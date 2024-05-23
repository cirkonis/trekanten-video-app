import {google} from 'googleapis';
import {OAuth2Client} from 'google-auth-library';
import {InternalError} from "@/app/api/_Error-Handlers/InternalError";

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID as string;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET as string;
const REDIRECT_URI = process.env.REDIRECT_URI;

export async function createNewPlaylist(accessToken: string, title: string) {
    try {
        // Create OAuth2 client
        const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

        oAuth2Client.setCredentials({access_token: accessToken});
        const youtube = google.youtube({
            version: 'v3',
            auth: oAuth2Client,
        });

// Create a new playlist
        const response = await youtube.playlists.insert({
            part: ['snippet', 'status'],
            requestBody: {
                snippet: {
                    title: title, // Customize the playlist title
                },
                status: {
                    privacyStatus: 'unlisted', // Customize the privacy status: 'private', 'public', or 'unlisted'
                },
            },
        });

        // Extract the ID of the newly created playlist
        const newPlaylistId = response.data.id;

        return new Response(JSON.stringify({ id: newPlaylistId }), {
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
