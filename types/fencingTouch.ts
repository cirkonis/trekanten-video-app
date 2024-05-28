import {ETouchTypes} from "@/enums/ETouchTypes";
import {ETouchSequenceElements} from "@/enums/ETouchSequenceElements";
import {Fencer} from "@/types/fencer";
import {TPistePosition} from "@/types/pistePosition";

export type FencingTouch = {
    id?: number;
    type: ETouchTypes | null;
    pointAwardedTo: Fencer[];
    touchAgainst: Fencer[];
    sequence: ETouchSequenceElements[];
    videoStartTimeStamp: number;
    videoEndTimeStamp?: number;
    fencingStartTime?: number;
    fencingEndTime?: number;
    positions: TPistePosition[];
};


export type Touch = {
    type: string;
    pointAwardedTo: { name: string; id: string; playlistId: string }[];
    touchAgainst: { name: string; id: string; playlistId: string }[];
    sequence: string[];
    videoStartTimeStamp: number;
    position: string;
}