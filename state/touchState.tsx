import { create } from 'zustand';
import {Touch} from "@/types/touch";
import {Fencer} from "@/types/fencer";
import {ETouche} from "@/enums/ETouche";
import {EPosition} from "@/enums/EPosition";
import {ETouchSequenceElements} from "@/enums/EActions";

export type TouchStoreActions = {
    // SETTERS
    setTouchType: (type: ETouche) => void;
    setGivenTo: (givenTo: Fencer[]) => void;
    setReceivedBy: (receivedBy: Fencer[]) => void;
    setSequence: (sequence: ETouchSequenceElements[]) => void;
    setVideoStartTimeStamp: (timeStamp: number) => void;
    setVideoEndTimeStamp: (timeStamp: number) => void;
    setFencingStartTime: (timeStamp: number) => void;
    setFencingEndTime: (timeStamp: number) => void;
    setPosition: (position: EPosition) => void;
    // GETTERS
    getTouchType: () => void;
    getGivenTo: () => void;
    getReceivedBy: () => void;
    getSequence: () => void;
    getVideoStartTimeStamp: () => void;
    getVideoEndTimeStamp: () => void;
    getFencingStartTime: () => void;
    getFencingEndTime: () => void;
    getPosition: () => void;
    // RESET
    resetTouch: () => void;
};

const initialTouchState: Touch = {
    type: ETouche.NO_TOUCH,
    givenTo: [],
    receivedBy: [],
    sequence: [],
    videoStartTimeStamp: 0,
    videoEndTimestamp: 0,
    fencingStartTime: 0,
    fencingEndTime: 0,
    position: EPosition.BOX_CENTER,
};

export const useTouchStore = create<Touch & TouchStoreActions>((set) => ({
        ...initialTouchState,

        // SETTERS
        setTouchType: (type: ETouche) => set((state) => ({ type: type })),
        setGivenTo: (givenTo: Fencer[]) => set((state) => ({ givenTo: givenTo })),
        setReceivedBy: (receivedBy: Fencer[]) => set((state) => ({ receivedBy: receivedBy })),
        setSequence: (sequence: ETouchSequenceElements[]) => set((state) => ({ sequence: sequence })),
        setVideoStartTimeStamp: (timeStamp: number) => set((state) => ({ videoStartTimeStamp: timeStamp })),
        setVideoEndTimeStamp: (timeStamp: number) => set((state) => ({ videoEndTimestamp: timeStamp })),
        setFencingStartTime: (timeStamp: number) => set((state) => ({ fencingStartTime: timeStamp })),
        setFencingEndTime: (timeStamp: number) => set((state) => ({ fencingEndTime: timeStamp })),
        setPosition: (position: EPosition) => set((state) => ({ position: position })),

        // GETTERS
        getTouchType: () => set((state) => ({ type: state.type })),
        getGivenTo: () => set((state) => ({ givenTo: state.givenTo })),
        getReceivedBy: () => set((state) => ({ receivedBy: state.receivedBy })),
        getSequence: () => set((state) => ({ sequence: state.sequence })),
        getVideoStartTimeStamp: () => set((state) => ({ videoStartTimeStamp: state.videoStartTimeStamp })),
        getVideoEndTimeStamp: () => set((state) => ({ videoEndTimestamp: state.videoEndTimestamp })),
        getFencingStartTime: () => set((state) => ({ fencingStartTime: state.fencingStartTime })),
        getFencingEndTime: () => set((state) => ({ fencingEndTime: state.fencingEndTime })),
        getPosition: () => set((state) => ({ position: state.position })),

        // RESET
        resetTouch: () => set({ ...initialTouchState }), // Reset action

    })
);
