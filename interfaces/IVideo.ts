import {IFencer} from "@/interfaces/IFencer";
import {IAction} from "@/interfaces/IAction";

export interface IVideo{
    title: string
    fencers: IFencer[]
    actions: IAction[]
}