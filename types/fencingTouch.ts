import {ETouchTypes} from "@/enums/ETouchTypes";
import {EPistePositions} from "@/enums/EPistePositions";
import {ETouchSequenceElements} from "@/enums/ETouchSequenceElements";
import {Time} from "@/types/time";
import {Fencer} from "@/types/fencer";

export type FencingTouch = {
    id?: number;
    type: ETouchTypes;
    pointAwardedTo: Fencer[];
    touchAgainst: Fencer[];
    sequence: ETouchSequenceElements[];
    videoStartTimeStamp: Time;
    videoEndTimeStamp?: Time;
    fencingStartTime?: Time;
    fencingEndTime?: Time;
    position: EPistePositions;
};