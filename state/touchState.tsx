import { create } from 'zustand';
import {FencingTouch} from "@/types/fencingTouch";
import {Fencer} from "@/types/fencer";
import {ETouchTypes} from "@/enums/ETouchTypes";
import {ETouchSequenceElements} from "@/enums/ETouchSequenceElements";
import {TPistePosition} from "@/types/pistePosition";
import {EPistePositions} from "@/enums/EPistePositions";

export type TouchStoreActions = {
    // SETTERS
    setTouchType: (type: ETouchTypes) => void;
    setPointAwardedTo: (givenTo: Fencer[]) => void;
    setTouchAgainst: (receivedBy: Fencer[]) => void;
    setSequence: (sequence: ETouchSequenceElements[]) => void;
    setVideoStartTimeStamp: (startTime: number) => void;
    setVideoEndTimeStamp: (endTime: number) => void;
    setFencingStartTime: (startTime: number) => void;
    setFencingEndTime: (endTime: number) => void;
    setPositions: (positions: TPistePosition[]) => void;
    // GETTERS
    getTouchType: () => void;
    getPointAwardedTo: () => void;
    getTouchAgainst: () => void;
    getSequence: () => void;
    getVideoStartTimeStamp: () => void;
    getVideoEndTimeStamp: () => void;
    getFencingStartTime: () => void;
    getFencingEndTime: () => void;
    getPositions: () => void;
    // RESET
    resetTouch: () => void;
};

const initialTouchState: FencingTouch = {
    type: null,
    pointAwardedTo: [],
    touchAgainst: [],
    sequence: [],
    videoStartTimeStamp: 0,
    // videoEndTimeStamp: 0,
    // fencingStartTime: 0,
    // fencingEndTime: 0,
    positions: [
        {position: EPistePositions.ZONE_1, fencerName: ""},
        {position: EPistePositions.ZONE_1, fencerName: ""},
    ],
};

export const useTouchStore = create<FencingTouch & TouchStoreActions>((set) => ({
        ...initialTouchState,

        // SETTERS
        setTouchType: (type: ETouchTypes) => set((state) => ({ type: type })),
        setPointAwardedTo: (givenTo: Fencer[]) => set((state) => ({ pointAwardedTo: givenTo })),
        setTouchAgainst: (receivedBy: Fencer[]) => set((state) => ({ touchAgainst: receivedBy })),
        setSequence: (sequence: ETouchSequenceElements[]) => set((state) => ({ sequence: sequence })),
        setVideoStartTimeStamp: (startTime: number ) => set((state) => ({ videoStartTimeStamp: startTime })),
        setVideoEndTimeStamp: (endTime: number) => set((state) => ({ videoEndTimeStamp: endTime })),
        setFencingStartTime: (startTime: number) => set((state) => ({ fencingStartTime: startTime})),
        setFencingEndTime: (endTime: number) => set((state) => ({ fencingEndTime: endTime })),
        setPositions: (positions: TPistePosition[]) => set((state) => ({ positions: positions })),

        // GETTERS
        getTouchType: () => set((state) => ({ type: state.type })),
        getPointAwardedTo: () => set((state) => ({ pointAwardedTo: state.pointAwardedTo })),
        getTouchAgainst: () => set((state) => ({ touchAgainst: state.touchAgainst })),
        getSequence: () => set((state) => ({ sequence: state.sequence })),
        getVideoStartTimeStamp: () => set((state) => ({ videoStartTimeStamp: state.videoStartTimeStamp })),
        getVideoEndTimeStamp: () => set((state) => ({ videoEndTimeStamp: state.videoEndTimeStamp })),
        getFencingStartTime: () => set((state) => ({ fencingStartTime: state.fencingStartTime })),
        getFencingEndTime: () => set((state) => ({ fencingEndTime: state.fencingEndTime })),
        getPositions: () => set((state) => ({ positions: state.positions })),

        // RESET
        resetTouch: () => set({ ...initialTouchState }), // Reset action

    })
);
