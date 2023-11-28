import { NextApiRequest, NextApiResponse } from 'next';
import { executeNeo4jQuery } from '@/app/api/_Neo4j-Utilities/neo4jDriver';
import {User} from "@/types/user";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';


export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const neo4jQuery = 'MATCH (u:User) RETURN u';

    const neo4jResult = await executeNeo4jQuery(neo4jQuery);

    if (neo4jResult.success && neo4jResult.data && neo4jResult.data.records) {
        const users = neo4jResult.data.records.map((record: any) => record.get(0).properties);
        return new Response(JSON.stringify(users), {status: 200, headers: {'Content-Type': 'application/json'}});
    } else {
        console.error('Failed to retrieve users:', neo4jResult);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function POST(req: Request) {
    const body = await req.json();

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
        email: newUser.email,
        name: newUser.name,
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

async function updateUser(req: NextApiRequest, res: NextApiResponse) {
    const { id, name, email, password } = req.body;

    const neo4jQuery = `
    MATCH (u:User {id: $id})
    SET u.name = $name, u.email = $email, u.password = $password
    RETURN u
  `;

    const neo4jResult = await executeNeo4jQuery(neo4jQuery, { id, name, email, password });

    if (neo4jResult.success && neo4jResult.data && neo4jResult.data.records) {
        const updatedUser = neo4jResult.data.records[0].get(0).properties;
        return res.status(200).json(updatedUser);
    } else {
        console.error('Failed to update user:', neo4jResult);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    const neo4jQuery = 'MATCH (u:User {id: $id}) DETACH DELETE u';
    const neo4jResult = await executeNeo4jQuery(neo4jQuery, { id });

    if (neo4jResult.success) {
        return res.status(204).end();
    } else {
        console.error('Failed to delete user:', neo4jResult);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
