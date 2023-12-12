import { create } from 'zustand';
import {Video} from "@/types/video";
import {Fencer} from "@/types/fencer";
import {FencingTouch} from "@/types/fencingTouch";
import React from "react";

export type VideoStoreActions = {
    addTouch: (touch: FencingTouch) => void;
    removeTouch: (touch: FencingTouch) => void;
    editTouch: (touch: FencingTouch) => void;
    getLeftFencer: () => void;
    getRightFencer: () => void;
    setLeftFencer: (fencer: Fencer) => void;
    setRightFencer: (fencer: Fencer) => void;
    setTitle: (title: string) => void;
    setUploadedVideo: (videoUrl: string) => void;
    setPlayerRef: (ref: React.RefObject<any>) => void;
    getPlayerRef: () => void;
    getTouches: () => void;
    resetVideo: () => void;
};

const initialVideoState: Video = {
    club: {
        name: "Trekanten",
    },
    title: "",
    leftFencer: {
        name: "Left Fencer",
    },
    rightFencer: {
        name: "Right Fencer",
    },
    touches: [],
    url: "",
};

export const useVideoStore = create<Video & VideoStoreActions>((set) => ({
    ...initialVideoState,

    setUploadedVideo: (videoUrl: string) => set(() => ({ url: videoUrl })),

    setPlayerRef: (ref: React.RefObject<any>) => set(() => ({ playerRef: ref })),
    getPlayerRef: () => set((state) => ({ playerRef: state.playerRef })),


    setTitle: (title: string) => set(() => ({ title: title })),

    addTouch: (touch: FencingTouch) => set((state) => ({ touches: [...state.touches, touch] })),
    removeTouch: (touch: FencingTouch) => set((state) => ({ touches: state.touches.filter((a) => a !== touch) })),
    editTouch: (touch: FencingTouch) => set((state) => ({ touches: state.touches.map((a) => (a === touch ? touch : a)) })),

    getLeftFencer: () => set((state) => ({ leftFencer: state.leftFencer })),
    getRightFencer: () => set((state) => ({ rightFencer: state.rightFencer })),
    getTouches: () => set((state) => ({ touches: state.touches })),

    setLeftFencer: (fencer: Fencer) => set(() => ({ leftFencer: fencer })),
    setRightFencer: (fencer: Fencer) => set(() => ({ rightFencer: fencer })),

    resetVideo: () => set(() => ({ ...initialVideoState })),
}));
