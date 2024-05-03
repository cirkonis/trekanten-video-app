import { InternalError } from "@/app/api/_Error-Handlers/InternalError";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req, secret });
        return new Response(JSON.stringify(token), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return InternalError(error);
    }
}
