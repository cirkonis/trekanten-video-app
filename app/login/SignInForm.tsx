"use client"; // Indicates that this module is client-side code.

import { signIn } from "next-auth/react"; // Import the signIn function from NextAuth for authentication.
import { useSearchParams, useRouter } from "next/navigation"; // Import Next.js navigation utilities.
import { ChangeEvent, useState } from "react"; // Import React hooks for managing component state.

export function SignInForm() {
    const [error, setError] = useState(""); // State for handling errors during authentication.

    const searchParams = useSearchParams(); // Get query parameters from the URL.
    const callbackUrl = searchParams.get("callbackUrl") || "/profile"; // Define a callback URL or use a default one.

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior.
    }
    return (
        <form onSubmit={onSubmit}>
            {error && (
                <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
            )}
            <button className="btn btn-secondary" onClick={() => signIn("google", { callbackUrl })}>
                Continue with Google
            </button>
        </form>
    );
};