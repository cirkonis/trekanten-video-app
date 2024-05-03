// api/tube.ts
import { uploadToTheTube } from '@/app/api/tube/uploadToTheTube';
import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
        try {
            const formData = await req.formData();
            const videoTitle = formData.get('videoTitle');
            const videoDescription = formData.get('videoDescription');
            const videoFile = formData.get('videoFile');
            const token = formData.get('token');


            return await uploadToTheTube(videoTitle, videoDescription, videoFile, token);

        } catch (error) {
            console.error('Error uploading video:', error);
            return InternalError(error);
        }
}