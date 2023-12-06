import {FencingTouch} from "@/types/fencingTouch";
import {BadRequest} from "@/app/api/_Error-Handlers/BadRequest";
import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
import Joi from "joi";
import {v4 as uuidv4} from "uuid";
import {Fencer} from "@/types/fencer";
import {executeNeo4jQuery} from "@/app/api/_Neo4j-Utilities/neo4jDriver";
import {ETouchTypes} from "@/enums/ETouchTypes";

export async function createTouch(touche: any): Promise<Response> {
    try {
        // Create a Joi schema for FencingTouch
        const fencingTouchSchema = Joi.object<FencingTouch>({
            id: Joi.string().uuid(),
            type: Joi.string().valid(...Object.values(ETouchTypes)).required(),
            pointAwardedTo: Joi.array().items(Joi.object<Fencer>({
                id: Joi.string().uuid().required(),
                name: Joi.string().required(),
            })).required(),
            touchAgainst: Joi.array().items(Joi.object<Fencer>({
                id: Joi.string().uuid().required(),
                name: Joi.string().required(),
            })).required(),
            // sequence: Joi.array().items(Joi.string().valid(...Object.values(ETouchSequenceElements))).required(),
            // videoStartTimeStamp: Joi.string().required(),
            // videoEndTimeStamp: Joi.string(),
            // fencingStartTime: Joi.string(),
            // fencingEndTime: Joi.string(),
            // position: Joi.string().valid(...Object.values(EPistePositions)).required(),
        });

        // Validate the request body against the schema
        const {error, value} = fencingTouchSchema.validate(touche);

        // If there is a validation error, return a 400 Bad Request response
        if (error) {
            console.error(error);
            return BadRequest();
        }

        let neo4jQuery: string;

        console.log('HI', value.pointAwardedTo[0])

        switch (value.type) {
            case ETouchTypes.SINGLE_TOUCH_RIGHT:
            case ETouchTypes.SINGLE_TOUCH_LEFT:
                neo4jQuery = `
CREATE (touch:Touch $touchProperties)

// Create relationships
WITH touch
// Match the awarded fencer by their id
MATCH (awarded:Fencer {id: $awardedId})

// Match the against fencer by their id
MATCH (against:Fencer {id: $againstId})

// Create relationships between touch and fencer nodes
CREATE (awarded)<-[:POINT_AWARDED]-(touch)-[:TOUCH_AGAINST]->(against)

// Return the created touch node
RETURN touch
        `;
                break;
            case ETouchTypes.DOUBLE_TOUCH:
                neo4jQuery = `
          // Create a touch node for both fencers
          CREATE (touch:Touch $touchProperties)
          
          // Create relationships
          WITH touch
          MATCH (fencer1:Fencer {id: $awardedId}), (fencer2:Fencer {id: $awardedId2})
          CREATE (fencer1)<-[:DOUBLE_TOUCH_POINT_AWARDED]-(touch)-[:DOUBLE_TOUCH_POINT_AWARDED]->(fencer2)
          
          RETURN touch
        `;
                break;

            case ETouchTypes.NO_TOUCH:
                neo4jQuery = `
          // Create a touch node
          CREATE (touch:Touch $touchProperties)
          
          // Create relationships
          WITH touch
          MATCH (awarded:Fencer {id: $againstId}), (against:Fencer {id: $againstId2})
          CREATE (awarded)<-[:NO_TOUCH_ACTION_WITH]-(touch)-[:NO_TOUCH_ACTION_WITH]->(against)
          
          RETURN touch
        `;
                break;
            default:
                return BadRequest();
        }

        // Execute the Neo4j query
        const neo4jResult = await executeNeo4jQuery(neo4jQuery, {
            touchProperties: {
                id: uuidv4(),
                name: value.type,
                type: value.type,
                // sequence: value.sequence,
                // videoStartTimeStamp: value.videoStartTimeStamp,
                // videoEndTimeStamp: value.videoEndTimeStamp,
                // fencingStartTime: value.fencingStartTime,
                // fencingEndTime: value.fencingEndTime,
                // position: value.position,
            },
            awardedId: value.pointAwardedTo[0]?.id,  // Use optional chaining to handle potential undefined
            awardedId2: value.pointAwardedTo[1]?.id,     // Use optional chaining to handle potential undefined
            againstId: value.touchAgainst[0]?.id,     // Use optional chaining to handle potential undefined
            againstId2: value.touchAgainst[1]?.id,      // Assuming the first fencer in the array is the against fencer
        });
        if (neo4jResult.success) {
            const createdTouch = neo4jResult.data.records[0].get(0).properties; // Adjust this based on your Neo4j result
            return new Response(JSON.stringify(createdTouch), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            return InternalError(neo4jResult.error);
        }
    } catch (error) {
        console.error(error);
        return InternalError(error);
    }
}
