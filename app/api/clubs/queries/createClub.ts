import Joi from "joi";
import {executeNeo4jQuery} from "@/app/api/_Neo4j-Utilities/neo4jDriver";
import {v4 as uuidv4} from "uuid";
import {Club} from "@/types/club";
import {BadRequest} from "@/app/api/_Error-Handlers/BadRequest";
import {getUserById} from "@/app/api/users/queries/getUserById";
import {DoesntExist} from "@/app/api/_Error-Handlers/DoesntExist";
import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
import {getClubByName} from "@/app/api/clubs/queries/getClubByName";
import {AlreadyExist} from "@/app/api/_Error-Handlers/AlreadyExist";

export async function createClub(club: Club): Promise<Response> {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            user: Joi.object({
                id: Joi.string().uuid().required(),
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            }).required(),
        });

        // Validate the request body against the schema
        const {error, value} = schema.validate(club);

        // If there is a validation error, return a 400 Bad Request response
        if (error) {
            return BadRequest();
        }

        const userExists = getUserById(value.user.id);

        if (!userExists) {
            return DoesntExist('User');
        }

        const clubExists = await getClubByName(value.name);

        if(clubExists){
            return AlreadyExist('Club', 'name');
        }

        const neo4jQuery = `
MATCH (u:User {id: $userId})
MERGE (c:Club {id: $clubId, name: $name})
MERGE (u)-[:HAS_CLUB]->(c)
RETURN c
`;

        const neo4jResult = await executeNeo4jQuery(neo4jQuery, {
            userId: value.user.id,
            name: value.name,
            clubId: uuidv4(),
        });

        if (neo4jResult.success) {
            const createdClub = neo4jResult.data.records[0].get(0).properties;
            return new Response(JSON.stringify(createdClub), {
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