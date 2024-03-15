import {google} from 'googleapis';
import {OAuth2Client} from 'google-auth-library';
import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
import {downloadVideoFromFirebase} from "@/lib/storage/downloadVideoFromFirebase";
import {Readable} from "node:stream";

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID as string;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET as string;
const REDIRECT_URI = process.env.REDIRECT_URI;

export async function uploadToTheTube(videoDetails: any, token: any) {
    try {
        // Create OAuth2 client
        const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

        oAuth2Client.setCredentials({access_token: token.access_token});

        // Create a new YouTube client with the obtained access token
        const youtube = google.youtube({
            version: 'v3',
            auth: oAuth2Client,
        });

        // Define video metadata
        const videoMetadata = {
            snippet: {
                title: videoDetails.title,
                description: videoDetails.description,
                categoryId: '22',
                tags: [], // Replace with an array of tags if needed
            },
            status: {
                privacyStatus: 'private',
            },
        };

        // Download the video file
        const videoToUpload = downloadVideoFromFirebase(videoDetails.bucketUrl)
        console.log('made it out of the download video from firebase storage function')
        console.log('trying to call the youtube api')
        // Upload video the thing to the tube
        const res = await youtube.videos.insert({
            part: ['snippet', 'status'],
            requestBody: videoMetadata,
            media: {
                mimeType: 'video/mp4',
                body: Readable.from(await videoToUpload),
            },
        });
        // Return video ID
        return new Response(JSON.stringify(res), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error uploading video to YouTube:', error);
        return InternalError(error);
    }
}
