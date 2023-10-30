import {IFencer} from "@/interfaces/IFencer";
import {IVideo} from "@/interfaces/IVideo";
import {IAction} from "@/interfaces/IAction";

export interface ITouch {
    fencer: IFencer
    opponent: IFencer
    video: IVideo
    action: IAction
}