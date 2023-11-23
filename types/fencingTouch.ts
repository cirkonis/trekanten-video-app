import {ETouchTypes} from "@/enums/ETouchTypes";
import {EPositions} from "@/enums/EPositions";
import {ETouchSequenceElements} from "@/enums/ETouchSequenceElements";
import {Fencer} from "@/types/fencer";

export type FencingTouch = {
    type: ETouchTypes;
    pointAwardedTo: Fencer[];
    touchAgainst: Fencer[];
    sequence: ETouchSequenceElements[];
    videoStartTimeStamp: number;
    videoEndTimeStamp?: number;
    fencingStartTime?: number;
    fencingEndTime?: number;
    position: EPositions;
};