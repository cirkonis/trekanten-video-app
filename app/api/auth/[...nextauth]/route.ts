import {NextAuthOptions} from "next-auth";
import NextAuth from "next-auth";
import GoogleProivder from  'next-auth/providers/google'
import {session} from "@/lib/session";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

const authOption: NextAuthOptions = {
    session:{
        strategy: 'jwt'
    },
    providers:[
        GoogleProivder({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks:{
        session,
    }
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST}