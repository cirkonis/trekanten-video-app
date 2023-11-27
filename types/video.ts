import {Fencer} from "@/types/fencer";
import {FencingTouch} from "@/types/fencingTouch";

export type Video = {
    title: string;
    leftFencer: Fencer;
    rightFencer: Fencer;
    touches: FencingTouch[];
};