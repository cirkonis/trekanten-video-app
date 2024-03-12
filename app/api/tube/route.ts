// import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
// import {uploadVideo} from "@/app/api/tube/uploadVideo";
//
// export async function POST(req: Request) {
//     try {
//         const body = await req.json();
//         console.log(body);
//         return await uploadVideo(body);
//
//     } catch (error) {
//         InternalError(error);
//     }
// }