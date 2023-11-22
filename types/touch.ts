import {ETouche} from "@/enums/ETouche";
import {EPosition} from "@/enums/EPosition";
import {ETouchSequenceElements} from "@/enums/EActions";
import {Fencer} from "@/types/fencer";

export type Touch = {
    type: ETouche
    givenTo: Fencer[];
    receivedBy: Fencer[];
    sequence: ETouchSequenceElements[];
    videoStartTimeStamp: number;
    videoEndTimestamp?: number;
    fencingStartTime?: number;
    fencingEndTime?: number;
    position: EPosition;
};