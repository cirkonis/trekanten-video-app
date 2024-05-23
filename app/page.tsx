'use client';

import React from "react";
import { useUserStore } from "@/state/usersState";
import Link from "next/link";
import {YouTubeChannelButton} from "@/components/YouTubeChannelButton";

export default function Home() {
    // Subscribe to loggedIn state
    const userLoggedIn = useUserStore(state => state.loggedIn);

    return (
        <main className="flex min-h-screen flex-col items-center text-pink-500">
            <div className="navbar-center">
            </div>
            {userLoggedIn ? (
                <div className="flex flex-col items-center">
                    <h1>Welcome</h1>
                    <div className="flex justify-evenly my-6">
                    <Link className="btn btn-warning mx-2" href="/unprocessed-videos">New Videos</Link>
                    <Link className="btn btn-info mx-2" href="/fencers">Fencers</Link>
                    <YouTubeChannelButton></YouTubeChannelButton>
                    </div>
                </div>
            ) : (
                <h1>Welcome</h1>
            )}
        </main>
    );
}
