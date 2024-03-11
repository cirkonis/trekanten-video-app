import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Video } from "@/types/video";

export async function createVideoData(video: Video) {
    try {
        const docRef = await addDoc(collection(db, "videos"), {
            id: video.id,
            title: video.title,
            leftFencer: video.leftFencer,
            rightFencer: video.rightFencer,
            touches: JSON.stringify(video.touches),
            bucketUrl: video.bucketUrl,
            youtubeUrl: 'Not yet uploaded',
            draftStatus: video.draftStatus,
            club: video.club,
        });
        console.log("Document written with ID: ", docRef.id);
        return true; // Return the ID of the created document
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e; // Throw the error for handling in the calling code
    }
}
