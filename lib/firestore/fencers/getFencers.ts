import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import {Fencer} from "@/types/fencer";


export async function getFencers() {
    const querySnapshot = await getDocs(collection(db, "fencers"));
    const fencers: Fencer[] = [];
    querySnapshot.forEach((doc) => {
        fencers.push(<Fencer>doc.data());
    });
    return fencers;
}
