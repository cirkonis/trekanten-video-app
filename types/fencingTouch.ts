import {ETouchTypes} from "@/enums/ETouchTypes";
import {EPistePositions} from "@/enums/EPistePositions";
import {ETouchSequenceElements} from "@/enums/ETouchSequenceElements";
import {Fencer} from "@/types/fencer";

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
    position: EPistePositions;
};


export type Touch = {
    type: string;
    pointAwardedTo: { name: string; id: string; playlistId: string }[];
    touchAgainst: { name: string; id: string; playlistId: string }[];
    sequence: string[];
    videoStartTimeStamp: number;
    position: string;
}