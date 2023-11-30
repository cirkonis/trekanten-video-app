import {createUser} from "@/app/api/users/queries/createUser";
import { validateUpdateUserBody} from "@/app/api/users/validaters";
import {listUsers} from "@/app/api/users/queries/listUsers";
import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
import {updateUser} from "@/app/api/users/queries/updateUser";
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

        return await createUser(body);

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

