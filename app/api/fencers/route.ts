import { executeNeo4jQuery } from '@/app/api/_Neo4j-Utilities/neo4jDriver';
import { createFencer } from "@/app/api/fencers/queries/createFencer";
import { InternalError } from "@/app/api/_Error-Handlers/InternalError";
import {deleteFencer} from "@/app/api/fencers/queries/deleteFencer";
import {updateFencer} from "@/app/api/fencers/queries/updateFencer";

export async function GET(req: Request) {
    const neo4jQuery = `
    MATCH (c:Club)-[:HAS_FENCER]->(f:Fencer)
    RETURN f
  `;

    const neo4jResult = await executeNeo4jQuery(neo4jQuery);

    if (neo4jResult.success && neo4jResult.data && neo4jResult.data.records) {
        const fencers = neo4jResult.data.records.map((record: any) => record.get(0).properties);
        return new Response(JSON.stringify(fencers), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
        console.error('Failed to retrieve fencers:', neo4jResult);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        return await createFencer(body.fencer, body.clubId);

    } catch (error) {
        InternalError(error);
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();

        return await updateFencer(body);

    } catch (error) {
        InternalError(error);
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        return await deleteFencer(id);

    } catch (error) {
        return InternalError(error);
    }
}
