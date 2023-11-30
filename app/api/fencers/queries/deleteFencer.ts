import Joi from "joi";
import { executeNeo4jQuery } from "@/app/api/_Neo4j-Utilities/neo4jDriver";
import { DoesntExist } from "@/app/api/_Error-Handlers/DoesntExist";
import { BadRequest } from "@/app/api/_Error-Handlers/BadRequest";
import { InternalError } from "@/app/api/_Error-Handlers/InternalError";
import {getFencerById} from "@/app/api/fencers/queries/getFencerById";

export async function deleteFencer(id: string): Promise<Response> {
    // Define the validation schema
    const schema = Joi.object({
        id: Joi.string().uuid().required(),
    });

    // Validate the request body against the schema
    const { error, value } = schema.validate({ id });

    // If there is a validation error, return a 400 Bad Request response
    if (error) {
        return BadRequest();
    }

    // Check if the club with the given ID exists
    const exist = await getFencerById(id);

    if (!exist) {
        return DoesntExist('Fencer');
    }

    const neo4jQuery = 'MATCH (f:Fencer {id: $id}) DETACH DELETE f';
    const neo4jResult = await executeNeo4jQuery(neo4jQuery, { id: value.id });

    if (neo4jResult.success) {
        return new Response(null, {
            status: 204,
        });
    } else {
        return InternalError(neo4jResult.error);
    }
}
