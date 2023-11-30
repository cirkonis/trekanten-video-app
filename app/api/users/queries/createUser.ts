import {executeNeo4jQuery} from "@/app/api/_Neo4j-Utilities/neo4jDriver";
import {User} from "@/types/user";
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';
import {getUserByEmail} from "@/app/api/users/queries/getUserByEmail";
import {AlreadyExist} from "@/app/api/_Error-Handlers/AlreadyExist";
import Joi from "joi";
import {BadRequest} from "@/app/api/_Error-Handlers/BadRequest";
import {InternalError} from "@/app/api/_Error-Handlers/InternalError";

export async function createUser(user: User): Promise<Response> {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        // Validate the request body against the schema
        const {error, value} = schema.validate(user);

        // If there is a validation error, return a 400 Bad Request response
        if (error) {
            return BadRequest();
        }

        // Check if a user with the same email, name, and password already exists
        const existingUser = await getUserByEmail(value.email);

        if (existingUser) {
            // If a user with the same credentials exists, return null or handle it as needed
            console.error('User with the same email already exists');
            return AlreadyExist('User', 'email');
        }


        const neo4jQuery = `
            MERGE (u:User {id: $id, name:$name, email: $email, password: $password, created_at: $created_at})
            RETURN u
        `;

        const neo4jResult = await executeNeo4jQuery(neo4jQuery, {
            id: uuidv4(),
            name: value.name,
            email: value.email,
            password: value.password,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss')
        });

        if (neo4jResult.success) {
            const createdUser = neo4jResult.data.records[0].get(0).properties;
            return new Response(JSON.stringify(createdUser), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            return InternalError(neo4jResult.error)
        }
    } catch (error) {
        throw error;
    }

}
