import {google} from 'googleapis';
import {OAuth2Client} from 'google-auth-library';
import {InternalError} from "@/app/api/_Error-Handlers/InternalError";

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID as string;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET as string;
const REDIRECT_URI = process.env.REDIRECT_URI;

interface IVideoMetaData {
    id: string
    title: string;
    description: string;
    videoId: string;
}

export async function updateVideo(accessToken: string, videoMetaData: IVideoMetaData) {
    try {
        // Create OAuth2 client
        const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

        oAuth2Client.setCredentials({access_token: accessToken});
        const youtube = google.youtube({
            version: 'v3',
            auth: oAuth2Client,
        });

        const videoMetadata = {
            id: videoMetaData.id,
            snippet: {
                title: videoMetaData.title,
                description: videoMetaData.description,
                tags: [], // Replace with an array of tags if needed
                categoryId: '22',
            },
        };


        // Add video to playlist
        const response = await youtube.videos.update({
            part: ['snippet', 'id'],
            requestBody: videoMetadata,
        });

        return new Response(JSON.stringify(response.data), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error adding video to playlist', error);
        return InternalError(error);
    }
}
