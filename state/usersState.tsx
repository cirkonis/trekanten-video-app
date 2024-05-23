import { create } from 'zustand';
import { User } from "@/types/user";

export type UserStoreActions = {
    // SETTERS
    setUser: (user: User) => void;
    setLoggedIn: (loggedIn: boolean) => void;
    setToken: (token: string) => void;
    setPhotoURL: (photoURL: string) => void;
    // GETTERS
    getUser: () => void;
    getLoggedIn: () => void;
    getToken: () => void;
    getPhotoURL: () => void;
    // RESET
    resetUser: () => void;
};

const initialUserState: User = {
    name: "",
    email: "",
    loggedIn: false,
    token: "",
    photoURL: "",
};

export const useUserStore = create<User & UserStoreActions>((set) => ({
        ...initialUserState,
        // SETTERS
        setUser: (user: User) => set(() => ({ ...user})),
        setLoggedIn: (loggedIn: boolean) => set((state) => ({ loggedIn: loggedIn })),
        setToken: (token: string) => set((state) => ({ token: token })),
        setPhotoURL: (photoURL: string) => set((state) => ({ photoURL: photoURL })),

        // GETTERS
        getUser: () => set((state) => (state)),
        getLoggedIn: () => set((state) => ({loggedIn: state.loggedIn})),
        getToken: () => set((state) => ({token: state.token})),
        getPhotoURL: () => set((state) => ({photoURL: state.photoURL})),

        // RESET
        resetUser: () => set(() => ({ ...initialUserState }))
    })
);
