import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
import {NextRequest, NextResponse} from "next/server";
import {listUnprocessedVideos} from "@/app/api/tube/unprocessed/listUnprocessedVideos";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const authorizationHeader = req.headers.get('Authorization');
        if (!authorizationHeader) {
            throw new Error('Authorization header missing');
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            throw new Error('Access token missing');
        }
        return await listUnprocessedVideos(accessToken);
    } catch (error) {
        console.error('Error uploading video:', error);
        return InternalError(error);
    }
}