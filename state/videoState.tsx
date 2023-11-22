import { create } from 'zustand';
import {Video} from "@/types/video";
import {Fencer} from "@/types/fencer";
import {Touch} from "@/types/touch";
import {ETouche} from "@/enums/ETouche";
import {EPosition} from "@/enums/EPosition";

export type VideoStoreActions = {
    addTouch: (touch: Touch) => void;
    removeTouch: (touch: Touch) => void;
    editTouch: (touch: Touch) => void;
    getLeftFencer: () => void;
    getRightFencer: () => void;
    setLeftFencer: (fencer: Fencer) => void;
    setRightFencer: (fencer: Fencer) => void;
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
};

export const useVideoStore = create<Video & VideoStoreActions>((set) => ({
    ...initialVideoState,

    setTitle: (title: string) => set(() => ({ title: title })),

    addTouch: (touch: Touch) => set((state) => ({ touches: [...state.touches, touch] })),
    removeTouch: (touch: Touch) => set((state) => ({ touches: state.touches.filter((a) => a !== touch) })),
    editTouch: (touch: Touch) => set((state) => ({ touches: state.touches.map((a) => (a === touch ? touch : a)) })),

    getLeftFencer: () => set((state) => ({ leftFencer: state.leftFencer })),
    getRightFencer: () => set((state) => ({ rightFencer: state.rightFencer })),

    setLeftFencer: (fencer: Fencer) => set(() => ({ leftFencer: fencer })),
    setRightFencer: (fencer: Fencer) => set(() => ({ rightFencer: fencer })),

    resetVideo: () => set(() => ({ ...initialVideoState })),
}));
