import { executeNeo4jQuery } from '@/app/api/_Neo4j-Utilities/neo4jDriver';
import { Club } from "@/types/club";
import { User } from "@/types/user";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Joi from "joi";

export async function GET(req: Request) {
    const neo4jQuery = `
    MATCH (u:User)-[:HAS_CLUB]->(c:Club)
    RETURN c
  `;

    const neo4jResult = await executeNeo4jQuery(neo4jQuery);

    if (neo4jResult.success && neo4jResult.data && neo4jResult.data.records) {
        const clubs = neo4jResult.data.records.map((record: any) => record.get(0).properties);
        return new Response(JSON.stringify(clubs), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
        console.error('Failed to retrieve clubs:', neo4jResult);
        return new Response('Internal Server Error', { status: 500 });
    }
}



export async function POST(req: Request) {
    const body = await req.json();

    const schema = Joi.object({
        name: Joi.string().required(),
        user: Joi.object({
            id: Joi.string(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }).required(),
    });

    // Validate the request body against the schema
    const { error, value } = schema.validate(body);

    // If there is a validation error, return a 400 Bad Request response
    if (error) {
        return new Response(JSON.stringify({ error: error.details[0].message }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const neo4jQuery = `
    MATCH (u:User {id: $userId})
    MERGE (c:Club {id: $id, name: $name})
    MERGE (u)-[:HAS_CLUB]->(c)
    RETURN c
  `;

    const neo4jResult = await executeNeo4jQuery(neo4jQuery, {
        userId: value.user.id,
        id: uuidv4(),
        name: value.name,
    });

    if (neo4jResult.success && neo4jResult.data && neo4jResult.data.records) {
        const createdClub = neo4jResult.data.records[0].get(0).properties;
        return new Response(JSON.stringify(createdClub), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } else {
        console.error('Failed to create club:', neo4jResult);
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}

export async function PUT(req: Request) {
    const body = await req.json();

    const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
    });

    // Validate the request body against the schema
    const { error, value } = schema.validate(body);

    // If there is a validation error, return a 400 Bad Request response
    if (error) {
        return new Response(JSON.stringify({ error: error.details[0].message }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const neo4jQuery = `
        MATCH (c:Club {id: $id})
        SET c.name = $name
        RETURN c
    `;

    const neo4jResult = await executeNeo4jQuery(neo4jQuery, {
        id: value.id,
        name: value.name,
    });

    if (neo4jResult.success && neo4jResult.data && neo4jResult.data.records && neo4jResult.data.records.length > 0) {
        const updatedClub = neo4jResult.data.records[0].get(0).properties;

        return new Response(JSON.stringify(updatedClub), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } else {
        console.error('Failed to update club:', neo4jResult);
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}



export async function DELETE(req: Request) {
    const { id } = await req.json();

    const schema = Joi.object({
        id: Joi.string().required(),
    });

    // Validate the request body against the schema
    const { error, value } = schema.validate({ id });

    // If there is a validation error, return a 400 Bad Request response
    if (error) {
        return new Response(JSON.stringify({ error: error.details[0].message }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const neo4jQuery = 'MATCH (c:Club {id: $id}) DETACH DELETE c';
    const neo4jResult = await executeNeo4jQuery(neo4jQuery, { id: value.id });

    if (neo4jResult.success) {
        return new Response(null, {
            status: 204,
        });
    } else {
        console.error('Failed to delete club:', neo4jResult);
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}
