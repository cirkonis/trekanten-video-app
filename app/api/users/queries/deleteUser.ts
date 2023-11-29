import Joi from "joi";
import {getUserById} from "@/app/api/users/queries/getUserById";
import {executeNeo4jQuery} from "@/app/api/_Neo4j-Utilities/neo4jDriver";
import {DoesntExist} from "@/app/api/_Error-Handlers/DoesntExist";
import {BadRequest} from "@/app/api/_Error-Handlers/BadRequest";
import {InternalError} from "@/app/api/_Error-Handlers/InternalError";

export async function deleteUser(id: string): Promise<Response> {
    // Define the validation schema
    const schema = Joi.object({
        id: Joi.string().uuid().required(),
    });

    // Validate the request body against the schema
    const {error, value} = schema.validate({id});

    // If there is a validation error, return a 400 Bad Request response
    if (error) {
        return BadRequest();
    }

    const exist = await getUserById(id);

    if (!exist) {
       return DoesntExist('User');
    }

    const neo4jQuery = 'MATCH (u:User {id: $id}) DETACH DELETE u';
    const neo4jResult = await executeNeo4jQuery(neo4jQuery, {id: value.id});

    if (neo4jResult.success) {
        return new Response(null, {
            status: 204,
        });
    } else {
        return InternalError(neo4jResult.error);
    }
}