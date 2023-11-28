import {NextApiRequest, NextApiResponse} from 'next';
import {executeNeo4jQuery} from '@/app/api/_Neo4j-Utilities/neo4jDriver';
import {User} from "@/types/user";
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';
import Joi from "joi";


export async function GET(req: Request) {
    const neo4jQuery = 'MATCH (u:User) RETURN u';

    const neo4jResult = await executeNeo4jQuery(neo4jQuery);

    if (neo4jResult.success && neo4jResult.data && neo4jResult.data.records) {
        const users = neo4jResult.data.records.map((record: any) => record.get(0).properties);
        return new Response(JSON.stringify(users), {status: 200, headers: {'Content-Type': 'application/json'}});
    } else {
        console.error('Failed to retrieve users:', neo4jResult);
        return new Response('Internal Server Error', {status: 500});
    }
}

export async function POST(req: Request) {
    const body = await req.json();

    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    // Validate the request body against the schema
    const {error, value} = schema.validate(body);

    // If there is a validation error, return a 400 Bad Request response
    if (error) {
        return new Response(JSON.stringify({error: error.details[0].message}), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const newUser: User = {
        id: uuidv4(), // Use the v4 function from uuid to generate a random UUID
        name: body.name,
        email: body.email,
        password: body.password,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    const neo4jQuery = `
  MERGE (u:User {email: $email})
  ON CREATE SET u.id = $id, u.name = $name, u.password = $password, u.created_at = $created_at
  RETURN u
`;

    const neo4jResult = await executeNeo4jQuery(neo4jQuery, {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        created_at: newUser.created_at,
        id: newUser.id,
    });

    if (neo4jResult.success && neo4jResult.data && neo4jResult.data.records) {
        const createdUser = neo4jResult.data.records[0].get(0).properties;
        return new Response(JSON.stringify(createdUser), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } else {
        console.error('Failed to create user:', neo4jResult);
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
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    // Validate the request body against the schema
    const {error, value} = schema.validate(body);

    // If there is a validation error, return a 400 Bad Request response
    if (error) {
        return new Response(JSON.stringify({error: error.details[0].message}), {});
    }

    const neo4jQuery = `
    MATCH (u:User {id: $id})
    SET u.name = $name, u.email = $email, u.password = $password
    RETURN u
  `;

    const neo4jResult = await executeNeo4jQuery(neo4jQuery, {
        id: value.id,
        name: value.name,
        email: value.email,
        password: value.password,
    });

    if (neo4jResult.success && neo4jResult.data && neo4jResult.data.records) {
        const updatedUser = neo4jResult.data.records[0].get(0).properties;
        return new Response(JSON.stringify(updatedUser), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } else {
        console.error('Failed to update user:', neo4jResult);
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

    const neo4jQuery = 'MATCH (u:User {id: $id}) DETACH DELETE u';
    const neo4jResult = await executeNeo4jQuery(neo4jQuery, { id: value.id });

    if (neo4jResult.success) {
        return new Response(null, {
            status: 204,
        });
    } else {
        console.error('Failed to delete user:', neo4jResult);
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}

