import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import {Fencer} from "@/types/fencer";

export async function getFencerById(fencerId: string) {
    try {
        const q = query(collection(db, "fencers"), where("id", "==", fencerId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docSnapshot = querySnapshot.docs[0];
            const fencerData = docSnapshot.data() as Fencer;
            return { ...fencerData, id: docSnapshot.id };
        } else {
            console.error("No such document!");
            return null;
        }
    } catch (e) {
        console.error("Error getting document: ", e);
        throw e; // Throw the error for handling in the calling code
    }
}
