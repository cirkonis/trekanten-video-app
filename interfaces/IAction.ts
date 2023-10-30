import {IFencer} from "@/interfaces/IFencer";
import {EActions} from "@/enums/EActions";
import {EPosition} from "@/enums/EPosition";
import {ETouche} from "@/enums/ETouche";

export interface IAction {
    fencerLeft: IFencer
    fencerRight: IFencer
    touchAwardedTo: ETouche
    actionSequence: EActions[]
    actionStartTime: number
    actionEndTime?: number
    fencingStartTime: number
    fencingEndTime?: number
    position: EPosition

}