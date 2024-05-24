import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { InternalError } from "@/app/api/_Error-Handlers/InternalError";

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID as string;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET as string;
const REDIRECT_URI = process.env.REDIRECT_URI;

export async function removeVideoFromPlaylist(accessToken: string, playlistId: string, videoId: string) {
    try {
        // Create OAuth2 client
        const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

        oAuth2Client.setCredentials({access_token: accessToken});
        const youtube = google.youtube({
            version: 'v3',
            auth: oAuth2Client,
        });

        const playlistItemsResponse = await youtube.playlistItems.list({
            part: ['id', 'snippet', 'status'],
            playlistId: playlistId,
        });
        const playlistItems = playlistItemsResponse.data.items;
        let playlistItemId: string | null | undefined = null;
        if(playlistItems){
            for(const item of playlistItems){
                // @ts-ignore
                if(item.snippet.resourceId.videoId === videoId){
                    playlistItemId = item.id
                }
            }
        } else{
            return new Response(JSON.stringify({message: 'Video not found in the playlist'}), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        await youtube.playlistItems.delete({
            id: String(playlistItemId),
        });

        return new Response(JSON.stringify({ message: 'Video removed from the playlist' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Error removing video from playlist', error);
        return InternalError(error);
    }
}
