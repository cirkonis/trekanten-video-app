import Joi from "joi";
import { executeNeo4jQuery } from "@/app/api/_Neo4j-Utilities/neo4jDriver";
import { v4 as uuidv4 } from "uuid";
import { Fencer } from "@/types/fencer";
import { BadRequest } from "@/app/api/_Error-Handlers/BadRequest";
import { getClubById } from "@/app/api/clubs/queries/getClubById";
import { DoesntExist } from "@/app/api/_Error-Handlers/DoesntExist";
import { InternalError } from "@/app/api/_Error-Handlers/InternalError";
import {getFencerByName} from "@/app/api/fencers/queries/getFencerByName";
import {AlreadyExist} from "@/app/api/_Error-Handlers/AlreadyExist";

export async function createFencer(fencer: Fencer, clubId: string): Promise<Response> {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
        });

        // Validate the request body against the schema
        const { error, value } = schema.validate(fencer);

        // If there is a validation error, return a 400 Bad Request response
        if (error) {
            return BadRequest();
        }

        // Check if the club with the given ID exists
        const clubExists = await getClubById(clubId);

        if (!clubExists) {
            return DoesntExist('Fencer');
        }

        const fencerAlreadyExists = await getFencerByName(value.name);

        if(fencerAlreadyExists){
            return AlreadyExist('Fencer', 'name');
        }

        const neo4jQuery = `
MATCH (c:Club {id: $clubId})
MERGE (f:Fencer {id: $fencerId, name: $name})
MERGE (c)-[:HAS_FENCER]->(f)
RETURN f
`;

        const neo4jResult = await executeNeo4jQuery(neo4jQuery, {
            clubId: clubId,
            fencerId: uuidv4(),
            name: value.name,
        });

        if (neo4jResult.success) {
            const createdFencer = neo4jResult.data.records[0].get(0).properties;
            return new Response(JSON.stringify(createdFencer), {
                status: 201,
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
