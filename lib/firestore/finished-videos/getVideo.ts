import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Video } from "@/types/video";

export async function getDraftVideoData(videoId: string) {
    try {
        const q = query(collection(db, "finished-videos"), where("id", "==", videoId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docSnapshot = querySnapshot.docs[0];
            const videoData = docSnapshot.data() as Video;
            return { ...videoData, id: docSnapshot.id };
        } else {
            console.error("No such document!");
            return null;
        }
    } catch (e) {
        console.error("Error getting document: ", e);
        throw e; // Throw the error for handling in the calling code
    }
}
