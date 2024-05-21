import {google} from 'googleapis';
import {OAuth2Client} from 'google-auth-library';
import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
import {Readable} from "node:stream";

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID as string;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET as string;
const REDIRECT_URI = process.env.REDIRECT_URI;

export async function uploadToTheTube(videoTitle: any, videoDescription: any,  videoFile: any, token: any) {
    console.log(token)
    try {
        // Create OAuth2 client
        const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

        oAuth2Client.setCredentials({access_token: token});

        const youtube = google.youtube({
            version: 'v3',
            auth: oAuth2Client,
        });

        const videoMetadata = {
            snippet: {
                title: videoTitle,
                description: videoDescription,
                categoryId: '22',
                tags: [], // Replace with an array of tags if needed
            },
            status: {
                privacyStatus: 'public',
                selfDeclaredMadeForKids: true,
            },
        };

        const fileBuffer = videoFile.stream()

        const res = await youtube.videos.insert({
            part: ['snippet', 'status'],
            requestBody: videoMetadata,
            media: {
                mimeType: 'video/mp4',
                body: Readable.from(fileBuffer),
            },
        });

        // const res = "testing";

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
