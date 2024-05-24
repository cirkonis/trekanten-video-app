import {NextRequest, NextResponse} from "next/server";
import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
import {updateVideo} from "@/app/api/tube/video/updateVideo";

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const authorizationHeader = req.headers.get('Authorization');
        if (!authorizationHeader) {
            throw new Error('Authorization header missing');
        }

        const accessToken = authorizationHeader.split(' ')[1];

        if (!accessToken) {
            throw new Error('Access token missing');
        }

        const videoMetaData = await req.json();

        if (!videoMetaData) {
            return new NextResponse('Video meta data missing', { status: 400 });
        }

        return await updateVideo(accessToken, videoMetaData);

    } catch (error) {
        console.error('Error updating video:', error);
        return InternalError(error);
    }
}