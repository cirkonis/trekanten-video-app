import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
import {createVideo} from "@/app/api/videos/createVideo";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        return await createVideo(body);

    } catch (error) {
        InternalError(error);
    }
}