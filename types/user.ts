
export type User= {
    id: string;
    name: string;
    email: string;
    password?: string;
    created_at?: string;
}

export type UserQuery = {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: string;
}