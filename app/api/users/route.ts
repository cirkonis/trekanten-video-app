import {executeNeo4jQuery} from '@/app/api/_Neo4j-Utilities/neo4jDriver';
import Joi, {valid} from "joi";
import {createUser} from "@/app/api/users/queries/createUser";
import {getUserByEmail} from "@/app/api/users/queries/getUserByEmail";
import {validateCrateUserBody, validateUpdateUserBody} from "@/app/api/users/validaters";
import {listUsers} from "@/app/api/users/queries/listUsers";
import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
import {updateUser} from "@/app/api/users/queries/updateUser";
import {getUserById} from "@/app/api/users/queries/getUserById";
import {deleteUser} from "@/app/api/users/queries/deleteUser";


export async function GET() {
    try {
        const users = await listUsers();

        return new Response(JSON.stringify(users), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error while processing request:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        const body = await req.json();

        const validUser = await validateCrateUserBody(body);

        return await createUser(validUser.name, validUser.email, validUser.password);

    } catch (error) {
        InternalError(error);
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();

        const validUser = await validateUpdateUserBody(body);

        return await updateUser(validUser.id, validUser.name, validUser.password);

    } catch (error) {
        return InternalError(error);
    }
}

export async function DELETE(req: Request) {
    try {
        const {id} = await req.json();

        return await deleteUser(id);

    }catch (error) {
        return InternalError(error);
    }
}

