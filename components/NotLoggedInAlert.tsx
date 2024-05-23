import React from "react";

// @ts-ignore
export function NotLoggedInAlert({ onClose }) {
    return (
        <div
            role="alert"
            className="fixed bottom-0 left-1/2 bg-red-500 p-4 flex justify-center items-center rounded-md"
        >
            <svg
                onClick={onClose}
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6 cursor-pointer text-white mr-2"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span className="text-white">Not Logged In!</span>
        </div>
    );
}
