"use client"; // Indicates that this module is client-side code.

import {auth} from "@/firebase";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useUserStore} from "@/state/usersState";
import {User} from "@/types/user";
import React, {useState} from "react";
import Link from 'next/link';

export function SignInButton() {

    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(useUserStore.getState().loggedIn || false );

    // Define the required scopes
    const SCOPES = [
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/youtubepartner',
    ];

    // Create a new GoogleAuthProvider instance and add scopes
    const provider = new GoogleAuthProvider();
    SCOPES.forEach(scope => provider.addScope(scope));

    const logGoogleUser = async () => {

        try {
            const result = await signInWithPopup(auth, provider);

            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);

            if (credential === null) {
                throw new Error("No credential in result");
            }
            const token = credential.accessToken;

            // The signed-in user info.
            const user: User = {
                name: String(result.user.displayName),
                email: String(result.user.email),
                loggedIn: true,
                token: token,
                photoURL: String(result.user.photoURL),
            };
            useUserStore.getState().setUser(user);
            setUserLoggedIn(true);
        } catch (error: any) {
            // Handle Errors here.
            const errorMessage = error.message;
            const email = error.customData ? error.customData.email : 'Unknown';
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorMessage, email, credential);
        }
    }

    return (
        <div>
            {userLoggedIn ? (
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt="user" src={useUserStore.getState().photoURL}/>
                    </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        <Link href="/profile" className="justify-between">
                            Profile
                        </Link>
                    </li>
                    {/*<li><a>Settings</a></li>*/}
                    {/*<li><a>Logout</a></li>*/}
                </ul>
            </div>
            ) : (
                <button className="btn btn-ghost" onClick={logGoogleUser}>
                    Sign In
                </button>
            )}
        </div>

    )

}
