import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function Profile() {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    return (
        <>
            <section className="bg-ct-blue-600  min-h-screen pt-20">
                <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
                    <div>
                        <Link href="/video">
                        <p className="mb-3 text-5xl text-center font-semibold">
                            Let's Go 🤺 🎥
                        </p>
                            </Link>
                        {!user ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="flex justify-evenly items-center gap-8">
                                    ☝🏿☝🏿☝🏿☝🏿☝🏿☝🏿☝🏿☝🏿☝🏿☝🏿☝🏿☝🏿
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}