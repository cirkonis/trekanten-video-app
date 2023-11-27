import {ETouchTypes} from "@/enums/ETouchTypes";
import {EPistePositions} from "@/enums/EPistePositions";
import {ETouchSequenceElements} from "@/enums/ETouchSequenceElements";
import {Fencer} from "@/types/fencer";

export type FencingTouch = {
    type: ETouchTypes;
    pointAwardedTo: Fencer[];
    touchAgainst: Fencer[];
    sequence: ETouchSequenceElements[];
    videoStartTimeStamp: number;
    videoEndTimeStamp?: number;
    fencingStartTime?: {
        minutes: number;
        seconds: number;
    };
    fencingEndTime?: {
        minutes: number;
        seconds: number;
    }
    position: EPistePositions;
};