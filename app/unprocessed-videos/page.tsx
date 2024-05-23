'use client'

import UnprocessedVids from "@/app/unprocessed-videos/UnprocessedVids";

export default function Videos() {
    return (
        <div className="my-4 px-6">
            <h1 className="my-2 text-lg">Stuff you need to work on</h1>
            <UnprocessedVids />
        </div>
    );
};
