"use client"; // Indicates that this module is client-side code.

import {auth, signInWithGooglePopup} from "@/firebase";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useUserStore} from "@/state/usersState";
import {User} from "@/types/user";
import React, {useState} from "react";
import Link from 'next/link';

export function SignInForm() {

    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

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
                <Link href="/videos">Let's do some stuff</Link>
            ) : (
                <button onClick={logGoogleUser}>Sign In With Google</button>
            )}
        </div>

    )

}
