import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
import {createVideoNodes} from "@/app/api/videos/createVideoNodes";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        return await createVideoNodes(body);

    } catch (error) {
        InternalError(error);
    }
}