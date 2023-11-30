import Joi from "joi";
import { executeNeo4jQuery } from "@/app/api/_Neo4j-Utilities/neo4jDriver";
import { BadRequest } from "@/app/api/_Error-Handlers/BadRequest";
import { getClubById } from "@/app/api/clubs/queries/getClubById";
import { InternalError } from "@/app/api/_Error-Handlers/InternalError";
import { DoesntExist } from "@/app/api/_Error-Handlers/DoesntExist";
import {getFencerById} from "@/app/api/fencers/queries/getFencerById";
import {getFencerByName} from "@/app/api/fencers/queries/getFencerByName";
import {AlreadyExist} from "@/app/api/_Error-Handlers/AlreadyExist";

export async function updateFencer(fencerData: { id: string; name: string }): Promise<Response> {
    try {
        const schema = Joi.object({
            id: Joi.string().uuid().required(),
            name: Joi.string().required(),
        });

        // Validate the request body against the schema
        const { error, value } = schema.validate(fencerData);

        // If there is a validation error, return a 400 Bad Request response
        if (error) {
            return BadRequest();
        }

        // Check if the club with the given ID exists
        const existingFencer = await getFencerById(value.id);

        if (!existingFencer) {
            return DoesntExist('Fencer');
        }

        const fencerWithSameName = await getFencerByName(value.name);

        if(fencerWithSameName){
            return AlreadyExist('Fencer', 'name');
        }

        // Perform the update
        const neo4jQuery = `
            MATCH (f:Fencer {id: $id})
            SET f.name = $name
            RETURN f
        `;

        const neo4jResult = await executeNeo4jQuery(neo4jQuery, {
            id: value.id,
            name: value.name,
        });

        if (neo4jResult.success) {
            const updatedClub = neo4jResult.data.records[0].get(0).properties;
            return new Response(JSON.stringify(updatedClub), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            return InternalError(neo4jResult.error);
        }
    } catch (error) {
        throw error;
    }
}
