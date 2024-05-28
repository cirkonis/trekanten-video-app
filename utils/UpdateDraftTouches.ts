import {useVideoStore} from "@/state/videoState";
import {EVideoStatus} from "@/enums/EVideoStatus";
import {updateDraftVideoData} from "@/lib/firestore/draft-videos/updateVideo";

export async function updateDraftTouches() {
    useVideoStore.getState().setStatus(EVideoStatus.SAVING_DRAFT);
    const videoData = {
        id: useVideoStore.getState().id,
        touches: useVideoStore.getState().touches,
    }
    try {
        await updateDraftVideoData(videoData);
        useVideoStore.getState().setStatus(EVideoStatus.SAVED_DRAFT);
    } catch (e) {
        useVideoStore.getState().setStatus(EVideoStatus.FAILED_TO_SAVE_DRAFT);
        console.error("Error updating draft touches:", e);
    }
}