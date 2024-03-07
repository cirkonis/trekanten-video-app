import { create } from 'zustand';
import {Video} from "@/types/video";
import {Fencer} from "@/types/fencer";
import {FencingTouch} from "@/types/fencingTouch";
import React from "react";
import {EVideoStatus} from "@/enums/EVideoStatus";

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
    getStatus: () => void;
    setStatus: (status: EVideoStatus) => void;
    getBucketUrl: () => void;
    setBucketUrl: (url: string) => void;
    getYouTubeUrl: () => void;
    setYouTubeUrl: (url: string) => void;

    getPlayerRef: () => void;
    getTouches: () => void;
    resetVideo: () => void;
};

const initialVideoState: Video = {
    club: {
        name: "Trekanten",
        id: "9747fb19-5a24-4c8f-b049-78072dd70ff6"
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
    bucketUrl: "",
    youtubeUrl: "",
    status: EVideoStatus.NEW,
};

export const useVideoStore = create<Video & VideoStoreActions>((set) => ({
    ...initialVideoState,

    setUploadedVideo: (videoUrl: string) => set(() => ({ url: videoUrl })),

    setPlayerRef: (ref: React.RefObject<any>) => set(() => ({ playerRef: ref })),
    getPlayerRef: () => set((state) => ({ playerRef: state.playerRef })),

    getStatus: () => set((state) => ({ status: state.status })),
    setStatus: (status: EVideoStatus) => set(() => ({ status: status })),

    setBucketUrl: (url: string) => set(() => ({ bucketUrl: url })),
    getBucketUrl: () => set((state) => ({ bucketUrl: state.bucketUrl })),

    setYouTubeUrl: (url: string) => set(() => ({ youtubeUrl: url })),
    getYouTubeUrl: () => set((state) => ({ youtubeUrl: state.youtubeUrl })),

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
