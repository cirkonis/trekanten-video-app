import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Video } from "@/types/video";

export async function getVideoData(videoId: string) {
    try {
        const docRef = doc(db, "videos", videoId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            const videoData = docSnapshot.data() as Video;
            return { id: docSnapshot.id, ...videoData };
        } else {
            console.error("No such document!");
            return null;
        }
    } catch (e) {
        console.error("Error getting document: ", e);
        throw e; // Throw the error for handling in the calling code
    }
}
