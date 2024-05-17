import { create } from 'zustand';
import { User } from "@/types/user";

export type UserStoreActions = {
    // SETTERS
    setUser: (user: User) => void;
    setLoggedIn: (loggedIn: boolean) => void;
    setToken: (token: string) => void;
    // GETTERS
    getUser: () => void;
    getLoggedIn: () => void;
    getToken: () => void;
    // RESET
    resetUser: () => void;
};

const initialUserState: User = {
    name: "",
    email: "",
    loggedIn: false,
    token: "",
};

export const useUserStore = create<User & UserStoreActions>((set) => ({
        ...initialUserState,
        // SETTERS
        setUser: (user: User) => set(() => ({ ...user})),
        setLoggedIn: (loggedIn: boolean) => set((state) => ({ loggedIn: loggedIn })),
        setToken: (token: string) => set((state) => ({ token: token })),

        // GETTERS
        getUser: () => set((state) => (state)),
        getLoggedIn: () => set((state) => ({loggedIn: state.loggedIn})),
        getToken: () => set((state) => ({token: state.token})),

        // RESET
        resetUser: () => set(() => ({ ...initialUserState }))
    })
);
