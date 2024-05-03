import {Fencer} from "@/types/fencer";
import {FencingTouch} from "@/types/fencingTouch";
import {Club} from "@/types/club";
import {EVideoStatus} from "@/enums/EVideoStatus";
import {EVideoDraftStatus} from "@/enums/EVideoDraftStatus";


export type Video = {
    id?: string;
    url?: string;
    bucketUrl?: string;
    youtubeUrl?: string;
    playerRef?: any;
    club: Club;
    title: string;
    leftFencer: Fencer;
    rightFencer: Fencer;
    touches: any;
    status?: EVideoStatus;
    draftStatus: EVideoDraftStatus;
    file?: File;
}