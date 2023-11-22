import {IFencer} from "@/interfaces/IFencer";
import {ITouch} from "@/interfaces/ITouch";

export interface IVideo{
    title: string
    leftFencer: IFencer
    rightFencer: IFencer
    toches: ITouch[]
}