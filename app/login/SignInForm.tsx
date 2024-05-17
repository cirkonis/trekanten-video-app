"use client"; // Indicates that this module is client-side code.

import {signInWithGooglePopup} from "@/firebase";
import {GoogleAuthProvider} from "firebase/auth";
import {useUserStore} from "@/state/usersState";
import {User} from "@/types/user";
import React, {useState} from "react";
import Link from 'next/link';

export function SignInForm() {

    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup().then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (credential === null) {
                throw new Error("No credential in result");
            }
            const token = credential.accessToken;
            // The signed-in user info.
            const user: User  = {
                name: String(result.user.displayName),
                email: String(result.user.email),
                loggedIn: true,
                token: token,
            }
            useUserStore.getState().setUser(user);
            setUserLoggedIn(true);

        }).catch((error) => {
            // Handle Errors here.
            const errorMessage = error.message;
            const email = error.customData ? error.customData.email : 'Unknown';
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorMessage, email, credential);
        })
    }

    return (
        <div>
            {userLoggedIn ? (
                <Link href="/video">Let's do some stuff</Link>
            ) : (
                <button onClick={logGoogleUser}>Sign In With Google</button>
            )}
        </div>

    )

}
