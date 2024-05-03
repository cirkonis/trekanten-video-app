// // saveVideoToBucket.ts
// import {uploadBytes} from "@firebase/storage";
// import {ref} from "firebase/storage";
// import {storage} from "@/firebase";
//
//
// export async function saveVideoToBucket(videoFile: File | undefined, bucketLocation: string | undefined): Promise<boolean> {
//     console.log('made it in the save video to bucket function');
//     const storageRef = ref(storage, bucketLocation);
//     if (!videoFile) {
//         throw new Error("No video file provided.");
//     }
//     if (!bucketLocation) {
//         throw new Error("No bucket location provided.");
//     }
//     try {
//         await uploadBytes(storageRef, videoFile);
//         console.log("Video uploaded successfully!");
//         return true
//     } catch (e) {
//         console.error("Error uploading video: ", e);
//         return false
//     }
// }

// TODO wait to implement this for after youtube gets implemented