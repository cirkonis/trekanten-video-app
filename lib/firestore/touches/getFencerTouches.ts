import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Video } from "@/types/video";

export async function getAllTouchesForFencer(fencerId: string): Promise<Touch[]> {
    try {
        const touches: Touch[] = [];

        // Create a query to find documents where the fencer is either the leftFencer or rightFencer
        const q = query(
            collection(db, "finished-videos"),
            where("leftFencer.id", "==", fencerId)
        );

        const q2 = query(
            collection(db, "finished-videos"),
            where("rightFencer.id", "==", fencerId)
        );

        // Execute the query to get all matching documents
        const querySnapshot = await getDocs(q);
        const querySnapshot2 = await getDocs(q2);

        // Combine results from both queries
        const allSnapshots = [...querySnapshot.docs, ...querySnapshot2.docs];

        // Iterate over each document to extract the touches
        allSnapshots.forEach((docSnapshot) => {
            const videoData = docSnapshot.data() as Video;

            if (videoData.touches) {
                // Parse the touches data if it's stored as a JSON string
                const videoTouches: Touch[] = JSON.parse(videoData.touches as unknown as string);
                touches.push(...videoTouches);
            }
        });
        return touches;
    } catch (e) {
        console.error("Error fetching touches: ", e);
        throw e; // Throw the error for handling in the calling code
    }
}
