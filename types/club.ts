import {User} from "@/types/user";

export type Club = {
    id?: string;
    name: string;
}

export type ClubQuery   = {
    id?: string;
    user: User;
    name: string;
}