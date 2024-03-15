import {google} from 'googleapis';
import {OAuth2Client} from 'google-auth-library';
import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
import * as fs from "fs";
import axios from "axios";

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID as string;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET as string;
const REDIRECT_URI = process.env.REDIRECT_URI;

export async function uploadVideo(videoDetails: any, file: any, token: any) {
    console.log("Video details before you tube call", videoDetails)
    try {
        // Create OAuth2 client
        const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

        oAuth2Client.setCredentials({access_token: token});

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

        console.log('Just the video file right before the you tube call', file)

        // Download the video file
        const response = await axios.get(videoDetails.videoBucketUrl, { responseType: 'stream' });
        const videoFilePath = file;
        const outputStream = fs.createWriteStream(videoFilePath);
        response.data.pipe(outputStream);

        // Wait for file to finish downloading
        await new Promise((resolve, reject) => {
            outputStream.on('finish', resolve);
            outputStream.on('error', reject);
        });


        setTimeout(() => {
            console.log("mock upload to you tube")
        }, 5000);
        // // Upload video the thing to the tube
        // const res = await youtube.videos.insert({
        //     part: ['snippet', 'status'],
        //     requestBody: videoMetadata,
        //     media: {
        //         mimeType: 'video/mp4',
        //         body: fs.createReadStream(videoFilePath), // Provide path to your video file
        //     },
        // });
        const res = {id: '123456789'};
        // Return video ID
        return new Response(JSON.stringify(res), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error uploading video to YouTube:', error);

        // Log error details
        // @ts-ignore
        if (error.response && error.response.data && error.response.data.error) {
            // @ts-ignore
            console.error('YouTube API Error Details:', error.response.data.error);
        }
        return InternalError(error);
    }
}
