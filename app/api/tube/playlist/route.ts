import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
import {NextRequest, NextResponse} from "next/server";
import {ListPlaylistVideos} from "@/app/api/tube/playlist/ListPlaylistVideos";
import {createNewPlaylist} from "@/app/api/tube/playlist/createNewPlaylist";
import {addVideoToPlaylist} from "@/app/api/tube/playlist/addVideoToPlaylist";
import {removeVideoFromPlaylist} from "@/app/api/tube/playlist/removeVideoFromPlaylist";

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

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const authorizationHeader = req.headers.get('Authorization');
        if (!authorizationHeader) {
            throw new Error('Authorization header missing');
        }

        const accessToken = authorizationHeader.split(' ')[1];

        if (!accessToken) {
            throw new Error('Access token missing');
        }

        const { title } = await req.json();
        if (!title) {
            return new NextResponse('Playlist title missing', { status: 400 });
        }

        return await createNewPlaylist(accessToken, title);

    } catch (error) {
        console.error('Error getting playlist:', error);
        return InternalError(error);
    }
}

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

        const { playlistId, videoId } = await req.json();

        if (!playlistId || !videoId) {
            return new NextResponse('Playlist ID or video ID missing', { status: 400 });
        }


        return await addVideoToPlaylist(accessToken, playlistId, videoId);

    } catch (error) {
        console.error('Error adding video to playlist:', error);
        return InternalError(error);
    }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
    try {
        const authorizationHeader = req.headers.get('Authorization');
        if (!authorizationHeader) {
            throw new Error('Authorization header missing');
        }

        const accessToken = authorizationHeader.split(' ')[1];

        if (!accessToken) {
            throw new Error('Access token missing');
        }

        const { playlistId, videoId } = await req.json();
        if (!playlistId || !videoId) {
            return new NextResponse('Playlist ID or video ID missing', { status: 400 });
        }


        return await removeVideoFromPlaylist(accessToken, playlistId, videoId);

    } catch (error) {
        console.error('Error adding video to playlist:', error);
        return InternalError(error);
    }
}