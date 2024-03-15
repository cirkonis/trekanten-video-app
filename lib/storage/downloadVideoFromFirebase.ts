// Function to download video from Firebase Storage
import {getDownloadURL, ref} from "@firebase/storage";
import {storage} from "@/firebase";

export async function downloadVideoFromFirebase(storagePath: string): Promise<Buffer> {
    console.log('in the download video from firebase storage function')
    try {
        const url = await getDownloadURL(ref(storage, storagePath)); // assuming storagePath is the path to your video
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to download video');
        }
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return buffer;
    } catch (error) {
        console.error('Error downloading video from Firebase Storage:', error);
        throw error;
    }
}
