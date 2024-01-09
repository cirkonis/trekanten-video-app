import {Fencer} from "@/types/fencer";
import {FencingTouch} from "@/types/fencingTouch";
import {Club} from "@/types/club";


export type Video = {
    id?: string;
    url?: string;
    playerRef?: any;
    club: Club;
    title: string;
    leftFencer: Fencer;
    rightFencer: Fencer;
    touches: FencingTouch[];
}