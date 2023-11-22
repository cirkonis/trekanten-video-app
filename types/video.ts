import {Fencer} from "@/types/fencer";
import {Touch} from "@/types/touch";

export type Video = {
    title: string;
    leftFencer: Fencer;
    rightFencer: Fencer;
    touches: Touch[];
};