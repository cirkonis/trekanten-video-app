import { executeNeo4jQuery } from '@/app/api/_Neo4j-Utilities/neo4jDriver';
import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
import {createTouch} from "@/app/api/touches/queries/createTouche";


// export async function GET(req: Request) {
//     console.log('to implement');
// }

export async function POST(req: Request) {
    try {
        const body = await req.json();

        return await createTouch(body);

    } catch (error) {
        InternalError(error);
    }
}

// export async function PUT(req: Request) {
//     try {
//         const body = await req.json();
//
//         return await updatetouch(body);
//
//     } catch (error) {
//         InternalError(error);
//     }
// }
//
// export async function DELETE(req: Request) {
//     try {
//         const { id } = await req.json();
//
//         return await deletetouch(id);
//
//     } catch (error) {
//         return InternalError(error);
//     }
// }
