'use client'

import { useUserStore } from "@/state/usersState";
import { User } from "@/types/user";

export default function Profile() {
    const user: User = useUserStore(state => state);

    return (
        <section className="bg-ct-blue-600 min-h-screen pt-20 flex justify-center items-center">
            <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-auto w-full flex flex-col justify-center items-center p-8">
                {user && user.loggedIn ? (
                    <>
                        <div className="avatar mb-4">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user.photoURL || "https://via.placeholder.com/150"} alt="User Avatar" />
                            </div>
                        </div>
                        <h2 className="text-3xl text-white mb-2">{user.name}</h2>
                        <h2 className="text-xl text-gray-400">{user.email}</h2>
                    </>
                ) : (
                    <h2 className="text-2xl text-white">No user logged in</h2>
                )}
            </div>
        </section>
    );
}
