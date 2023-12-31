import { create } from 'zustand';
import {FencingTouch} from "@/types/fencingTouch";
import {Fencer} from "@/types/fencer";
import {ETouchTypes} from "@/enums/ETouchTypes";
import {EPistePositions} from "@/enums/EPistePositions";
import {ETouchSequenceElements} from "@/enums/ETouchSequenceElements";
import {Time} from "@/types/time";

export type TouchStoreActions = {
    // SETTERS
    setTouchType: (type: ETouchTypes) => void;
    setPointAwardedTo: (givenTo: Fencer[]) => void;
    setTouchAgainst: (receivedBy: Fencer[]) => void;
    setSequence: (sequence: ETouchSequenceElements[]) => void;
    setVideoStartTimeStamp: (startTime: Time) => void;
    setVideoEndTimeStamp: (endTime: Time) => void;
    setFencingStartTime: (startTime: Time) => void;
    setFencingEndTime: (endTime: Time) => void;
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
    videoStartTimeStamp: {minutes: 0, seconds: 0},
    videoEndTimeStamp: {minutes: 0, seconds: 0},
    fencingStartTime: {minutes: 0, seconds: 0},
    fencingEndTime: {minutes: 0, seconds: 0},
    position: EPistePositions.CENTER_LINE,
};

export const useTouchStore = create<FencingTouch & TouchStoreActions>((set) => ({
        ...initialTouchState,

        // SETTERS
        setTouchType: (type: ETouchTypes) => set((state) => ({ type: type })),
        setPointAwardedTo: (givenTo: Fencer[]) => set((state) => ({ pointAwardedTo: givenTo })),
        setTouchAgainst: (receivedBy: Fencer[]) => set((state) => ({ touchAgainst: receivedBy })),
        setSequence: (sequence: ETouchSequenceElements[]) => set((state) => ({ sequence: sequence })),
        setVideoStartTimeStamp: (startTime: Time ) => set((state) => ({ videoStartTimeStamp: startTime })),
        setVideoEndTimeStamp: (endTime: Time) => set((state) => ({ videoEndTimeStamp: endTime })),
        setFencingStartTime: (startTime: Time) => set((state) => ({ fencingStartTime: startTime})),
        setFencingEndTime: (endTime: Time) => set((state) => ({ fencingEndTime: endTime })),
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
