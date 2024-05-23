import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import {Fencer} from "@/types/fencer";

export async function addFencer(fencer: Fencer) {
    try {
        const docRef = await addDoc(collection(db, "fencers"), {
            id: fencer.id,
            name: fencer.name,
            playlistId: fencer.playlistId
        });
        console.log("Fencer Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}