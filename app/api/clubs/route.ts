import {executeNeo4jQuery} from '@/app/api/_Neo4j-Utilities/neo4jDriver';
import {createClub} from "@/app/api/clubs/queries/createClub";
import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
import {updateClub} from "@/app/api/clubs/queries/updateClub";
import {deleteClub} from "@/app/api/clubs/queries/deleteClub";

export async function GET(req: Request) {
    const neo4jQuery = `
    MATCH (u:User)-[:HAS_CLUB]->(c:Club)
    RETURN c
  `;

    const neo4jResult = await executeNeo4jQuery(neo4jQuery);

    if (neo4jResult.success && neo4jResult.data && neo4jResult.data.records) {
        const clubs = neo4jResult.data.records.map((record: any) => record.get(0).properties);
        return new Response(JSON.stringify(clubs), {status: 200, headers: {'Content-Type': 'application/json'}});
    } else {
        console.error('Failed to retrieve clubs:', neo4jResult);
        return new Response('Internal Server Error', {status: 500});
    }
}


export async function POST(req: Request) {
    try {
        const body = await req.json();

        return await createClub(body)

    } catch (error) {
        InternalError(error);
    }

}

export async function PUT(req: Request) {
    try {
        const body = await req.json();

        return await updateClub(body);

    } catch (error) {
        InternalError(error);
    }
}


export async function DELETE(req: Request) {
        try {
            const {id} = await req.json();

            return await deleteClub(id);

        }catch (error) {
            return InternalError(error);
        }
}
