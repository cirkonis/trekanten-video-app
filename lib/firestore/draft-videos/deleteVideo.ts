import {collection, deleteDoc, doc, getDocs, query, QuerySnapshot, where} from "firebase/firestore";
import {db} from "@/firebase";

export async function deleteDraftVideoData(videoId: string) {
    try {
        const docRef = doc(db, "draft-videos", videoId);

        // Create a query to find documents where 'id' matches the provided videoId
        const q = query(collection(db, "draft-videos"), where("id", "==", videoId));
        const querySnapshot: QuerySnapshot = await getDocs(q);
        // Check if there are any documents that match the query
        if (querySnapshot.empty) {
            throw new Error("No documents found with the provided video ID.");
        }

        // Get the first document that matches the query
        const docSnapshot = querySnapshot.docs[0];

        await deleteDoc(docSnapshot.ref);
        return true; // Return the ID of the created document
    } catch (e) {
        console.error("Error getting document: ", e);
        throw e; // Throw the error for handling in the calling code
    }
}