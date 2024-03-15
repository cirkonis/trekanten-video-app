import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
import {getToken} from "next-auth/jwt";
import {uploadToTheTube} from "@/app/api/tube/uploadToTheTube";
import {NextRequest} from "next/server";

const secret = process.env.NEXTAUTH_SECRET

export async function POST(req: NextRequest) {
    const token = await getToken({ req, secret })
    console.log(token)
    const body = await req.json()
    const videoDetails = body
    console.log('In the route',videoDetails)
    try {
        return uploadToTheTube(videoDetails, token)
    } catch (error) {
        InternalError(error);
    }
}