// saveDraftVideoToBucket.ts
import {uploadBytes} from "@firebase/storage";
import {ref} from "firebase/storage";
import {storage} from "@/firebase";


export async function saveDraftVideoToBucket(videoFile: File, videoId: string, videoTitle: string): Promise<void> {
    const storageRef = ref(storage, `${process.env.VIDEO_BUCKET as string}/${videoId}/${videoTitle}`);
    if (!videoFile) {
        throw new Error("No video file provided.");
    }
    await uploadBytes(storageRef, videoFile);
    console.log("Video uploaded successfully!");
}