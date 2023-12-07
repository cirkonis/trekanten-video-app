import Joi from "joi";
import {Video} from "@/types/video";
import {BadRequest} from "@/app/api/_Error-Handlers/BadRequest";
import {executeNeo4jQuery} from "@/app/api/_Neo4j-Utilities/neo4jDriver";
import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
import {FencingTouch} from "@/types/fencingTouch";
import {Fencer} from "@/types/fencer";
import {ETouchTypes} from "@/enums/ETouchTypes";
import {ETouchSequenceElements} from "@/enums/ETouchSequenceElements";
import {v4 as uuidv4} from "uuid";
import {createTouch} from "@/app/api/touches/queries/createTouche";

export async function createVideo(video: Video) {
    try {
        // Validate the request body using the Joi schema
        const videoSchema = Joi.object<Video>({
            club: Joi.object({
                id: Joi.string().uuid().required(),
                name: Joi.string().required(),
            }),
            title: Joi.string().required(),
            url: Joi.string(),
            leftFencer: Joi.object<Fencer>({
                id: Joi.string().uuid().required(),
                name: Joi.string().required(),
            }).required(),
            rightFencer: Joi.object<Fencer>({
                id: Joi.string().uuid().required(),
                name: Joi.string().required(),
            }).required(),
            touches: Joi.array().items(Joi.object<FencingTouch>({
                id: Joi.number(),
                type: Joi.string().valid(...Object.values(ETouchTypes)).required(),
                pointAwardedTo: Joi.array().items(Joi.object<Fencer>({
                    id: Joi.string().uuid().required(),
                    name: Joi.string().required(),
                })).required(),
                touchAgainst: Joi.array().items(Joi.object<Fencer>({
                    id: Joi.string().uuid().required(),
                    name: Joi.string().required(),
                })).required(),
                sequence: Joi.array().items(Joi.string().valid(...Object.values(ETouchSequenceElements))).required(),
                videoStartTimeStamp: Joi.number().integer().min(0).required(),
                videoEndTimeStamp: Joi.number().integer().min(0),
                fencingStartTime: Joi.number().integer().min(0),
                fencingEndTime: Joi.number().integer().min(0),
                position: Joi.string().valid(/* Add valid values for EPistePositions */).required(),
            })).required(),
        });
        // Validate the request body against the schema
        const {error, value} = videoSchema.validate(video);


        // If there is a validation error, return a 400 Bad Request response
        if (error) {
            console.error(error);
            return BadRequest();
        }

        // Get the club and fencer IDs
        const clubId = value.club.id;
        const leftFencerId = value.leftFencer.id;
        const rightFencerId = value.rightFencer.id;

        const touchIds: string[] = [];

        // Create a Neo4j query to establish relationships
        const neo4jQuery = `
            MATCH (club:Club {id: $clubId})
            MATCH (leftFencer:Fencer {id: $leftFencerId})
            MATCH (rightFencer:Fencer {id: $rightFencerId})
            
            // Create relationships between club, fencers, and video
            CREATE (club)-[:HAS_VIDEO]->(video:Video $videoProperties)
            CREATE (leftFencer)-[:IS_IN_VIDEO]->(video)
            CREATE (rightFencer)-[:IS_IN_VIDEO]->(video)

            // Return the created video node
            RETURN video
        `;

        // Execute the Neo4j query
        const neo4jResult = await executeNeo4jQuery(neo4jQuery, {
            clubId,
            leftFencerId,
            rightFencerId,
            videoProperties: {
                id: uuidv4(),
                title: value.title,
                url: value.url,
            },
        });

        // Check if the video node creation was successful
        if (neo4jResult.success) {
            const createdVideo = neo4jResult.data.records[0].get(0).properties;

            // Iterate over each touch and call createTouch function
            for (const touch of value.touches) {
                try {
                    const touchResult = await createTouch({
                        ...touch,
                        // Pass any additional parameters needed by createTouch function
                    });
                } catch (error) {
                    console.error('Failed to create touch:', error);
                    return InternalError(error);
                }
            }

            return new Response(JSON.stringify(createdVideo), {
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