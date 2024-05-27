import {collection, doc, getDocs, updateDoc, where, QuerySnapshot, query} from "firebase/firestore";
import { db } from "@/firebase";
import { Video } from "@/types/video";

export async function updateDraftVideoData(updatedVideoData: Partial<Video>) {
    try {
        if (!updatedVideoData.id) {
            throw new Error("Video ID is undefined.");
        }

        // Create a query to find documents where 'id' matches the provided videoId
        const q = query(collection(db, "finished-videos"), where("id", "==", updatedVideoData.id));
        const querySnapshot: QuerySnapshot = await getDocs(q);

        // Check if there are any documents that match the query
        if (querySnapshot.empty) {
            throw new Error("No documents found with the provided video ID.");
        }

        // Get the first document that matches the query
        const docSnapshot = querySnapshot.docs[0];

        // Check if the 'touches' field exists and if it's an array
        if (updatedVideoData.touches) {
            // Stringify the 'touches' field
            updatedVideoData.touches = JSON.stringify(updatedVideoData.touches);
        }

        // Update the document with the provided data
        await updateDoc(doc(docSnapshot.ref.firestore, "finished-videos", docSnapshot.id), updatedVideoData);
    } catch (e) {
        console.error("Error updating document: ", e);
        throw e; // Throw the error for handling in the calling code
    }
}
