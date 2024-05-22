import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
import {NextRequest, NextResponse} from "next/server";
import {ListPlaylistVideos} from "@/app/api/tube/playlist/ListPlaylistVideos";

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

        // Extracting query parameters
        const params = new URLSearchParams(req.url.split('?')[1]);

        const id: string = params.get('id') || 'Id Missing';

        if (!id || id === 'Id Missing') {
            throw new Error('id is missing');
        }

        return await ListPlaylistVideos(accessToken, id);
    } catch (error) {
        console.error('Error getting playlist:', error);
        return InternalError(error);
    }
}