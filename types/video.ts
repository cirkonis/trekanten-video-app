import {Fencer} from "@/types/fencer";
import {Club} from "@/types/club";
import {EVideoStatus} from "@/enums/EVideoStatus";
import {EVideoDraftStatus} from "@/enums/EVideoDraftStatus";


export type Video = {
    id?: string;
    url?: string;
    youtubeVideoId?: string;
    youtubeUrl?: string;
    club: Club;
    title: string;
    leftFencer: Fencer;
    rightFencer: Fencer;
    touches: any;
    status?: EVideoStatus;
    draftStatus: EVideoDraftStatus;
    file?: File;
}