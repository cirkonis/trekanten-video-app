// // lib/session.ts
//
// import { Session } from 'next-auth';
//
// export const session = async ({ session, token }: { session: Session, token: any }) => {
//     if (!token) {
//         throw new Error("No token provided for session");
//     }
//
//     // @ts-ignore
//     session.user.id = token.id;
//
//     return session;
// };
//
//
