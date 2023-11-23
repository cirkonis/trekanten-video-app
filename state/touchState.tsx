import { create } from 'zustand';
import {FencingTouch} from "@/types/fencingTouch";
import {Fencer} from "@/types/fencer";
import {ETouchTypes} from "@/enums/ETouchTypes";
import {EPistePositions} from "@/enums/EPistePositions";
import {ETouchSequenceElements} from "@/enums/ETouchSequenceElements";

export type TouchStoreActions = {
    // SETTERS
    setTouchType: (type: ETouchTypes) => void;
    setPointAwardedTo: (givenTo: Fencer[]) => void;
    setTouchAgainst: (receivedBy: Fencer[]) => void;
    setSequence: (sequence: ETouchSequenceElements[]) => void;
    setVideoStartTimeStamp: (timeStamp: number) => void;
    setVideoEndTimeStamp: (timeStamp: number) => void;
    setFencingStartTime: (timeStamp: number) => void;
    setFencingEndTime: (timeStamp: number) => void;
    setPosition: (position: EPistePositions) => void;
    // GETTERS
    getTouchType: () => void;
    getPointAwardedTo: () => void;
    getTouchAgainst: () => void;
    getSequence: () => void;
    getVideoStartTimeStamp: () => void;
    getVideoEndTimeStamp: () => void;
    getFencingStartTime: () => void;
    getFencingEndTime: () => void;
    getPosition: () => void;
    // RESET
    resetTouch: () => void;
};

const initialTouchState: FencingTouch = {
    type: ETouchTypes.NO_TOUCH,
    pointAwardedTo: [],
    touchAgainst: [],
    sequence: [],
    videoStartTimeStamp: 0,
    videoEndTimeStamp: 0,
    fencingStartTime: 0,
    fencingEndTime: 0,
    position: EPistePositions.BOX_CENTER,
};

export const useTouchStore = create<FencingTouch & TouchStoreActions>((set) => ({
        ...initialTouchState,

        // SETTERS
        setTouchType: (type: ETouchTypes) => set((state) => ({ type: type })),
        setPointAwardedTo: (givenTo: Fencer[]) => set((state) => ({ pointAwardedTo: givenTo })),
        setTouchAgainst: (receivedBy: Fencer[]) => set((state) => ({ touchAgainst: receivedBy })),
        setSequence: (sequence: ETouchSequenceElements[]) => set((state) => ({ sequence: sequence })),
        setVideoStartTimeStamp: (timeStamp: number) => set((state) => ({ videoStartTimeStamp: timeStamp })),
        setVideoEndTimeStamp: (timeStamp: number) => set((state) => ({ videoEndTimeStamp: timeStamp })),
        setFencingStartTime: (timeStamp: number) => set((state) => ({ fencingStartTime: timeStamp })),
        setFencingEndTime: (timeStamp: number) => set((state) => ({ fencingEndTime: timeStamp })),
        setPosition: (position: EPistePositions) => set((state) => ({ position: position })),

        // GETTERS
        getTouchType: () => set((state) => ({ type: state.type })),
        getPointAwardedTo: () => set((state) => ({ pointAwardedTo: state.pointAwardedTo })),
        getTouchAgainst: () => set((state) => ({ touchAgainst: state.touchAgainst })),
        getSequence: () => set((state) => ({ sequence: state.sequence })),
        getVideoStartTimeStamp: () => set((state) => ({ videoStartTimeStamp: state.videoStartTimeStamp })),
        getVideoEndTimeStamp: () => set((state) => ({ videoEndTimeStamp: state.videoEndTimeStamp })),
        getFencingStartTime: () => set((state) => ({ fencingStartTime: state.fencingStartTime })),
        getFencingEndTime: () => set((state) => ({ fencingEndTime: state.fencingEndTime })),
        getPosition: () => set((state) => ({ position: state.position })),

        // RESET
        resetTouch: () => set({ ...initialTouchState }), // Reset action

    })
);
