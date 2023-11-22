import { create } from 'zustand';
import {Video} from "@/types/video";
import {Fencer} from "@/types/fencer";
import {FencingTouch} from "@/types/fencingTouch";

export type VideoStoreActions = {
    addTouch: (touch: FencingTouch) => void;
    removeTouch: (touch: FencingTouch) => void;
    editTouch: (touch: FencingTouch) => void;
    getLeftFencer: () => void;
    getRightFencer: () => void;
    setLeftFencer: (fencer: Fencer) => void;
    setRightFencer: (fencer: Fencer) => void;
    setPausedTimeStamp: (timestamp: number) => void;
    getPausedTimeStamp: () => void;
    setTitle: (title: string) => void;
    resetVideo: () => void;
};

const initialVideoState: Video = {
    title: "Video Title",
    leftFencer: {
        name: "Left Fencer",
    },
    rightFencer: {
        name: "Right Fencer",
    },
    touches: [],

    pausedTimeStamp: 0,
};

export const useVideoStore = create<Video & VideoStoreActions>((set) => ({
    ...initialVideoState,

    setTitle: (title: string) => set(() => ({ title: title })),

    addTouch: (touch: FencingTouch) => set((state) => ({ touches: [...state.touches, touch] })),
    removeTouch: (touch: FencingTouch) => set((state) => ({ touches: state.touches.filter((a) => a !== touch) })),
    editTouch: (touch: FencingTouch) => set((state) => ({ touches: state.touches.map((a) => (a === touch ? touch : a)) })),

    getLeftFencer: () => set((state) => ({ leftFencer: state.leftFencer })),
    getRightFencer: () => set((state) => ({ rightFencer: state.rightFencer })),
    getPausedTimeStamp: () => set((state) => ({ pausedTimeStamp: state.pausedTimeStamp })),

    setLeftFencer: (fencer: Fencer) => set(() => ({ leftFencer: fencer })),
    setRightFencer: (fencer: Fencer) => set(() => ({ rightFencer: fencer })),
    setPausedTimeStamp: (timestamp: number) => set(() => ({ pausedTimeStamp: timestamp })),

    resetVideo: () => set(() => ({ ...initialVideoState })),
}));
