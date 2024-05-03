import {NextAuthOptions} from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from  'next-auth/providers/google'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

const authOption: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    scope: "openid https://www.googleapis.com/auth/youtube.upload"
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, account}) {
            if (account) {
                token = Object.assign({}, token, {access_token: account.access_token});
            }
            return token
        },
        async session({session, token}) {
            if (session) {
                session = Object.assign({}, session, {access_token: token.access_token})
                console.log(session);
            }
            return session
        }
    }
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST}