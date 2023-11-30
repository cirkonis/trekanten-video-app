import Joi from "joi";
import { executeNeo4jQuery } from "@/app/api/_Neo4j-Utilities/neo4jDriver";
import { Club } from "@/types/club";
import { BadRequest } from "@/app/api/_Error-Handlers/BadRequest";
import { getClubById } from "@/app/api/clubs/queries/getClubById";
import { InternalError } from "@/app/api/_Error-Handlers/InternalError";
import { DoesntExist } from "@/app/api/_Error-Handlers/DoesntExist";

export async function updateClub(clubData: { id: string; name: string }): Promise<Response> {
    try {
        const schema = Joi.object({
            id: Joi.string().uuid().required(),
            name: Joi.string().required(),
        });

        // Validate the request body against the schema
        const { error, value } = schema.validate(clubData);

        // If there is a validation error, return a 400 Bad Request response
        if (error) {
            return BadRequest();
        }

        // Check if the club with the given ID exists
        const existingClub = await getClubById(value.id);

        if (!existingClub) {
            return DoesntExist('Club');
        }

        // Perform the update
        const neo4jQuery = `
            MATCH (c:Club {id: $clubId})
            SET c.name = $name
            RETURN c
        `;

        const neo4jResult = await executeNeo4jQuery(neo4jQuery, {
            clubId: value.id,
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
