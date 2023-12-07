// import Joi from "joi";
// import {VideoDraft} from "@/types/video";
// import {BadRequest} from "@/app/api/_Error-Handlers/BadRequest";
// import {executeNeo4jQuery} from "@/app/api/_Neo4j-Utilities/neo4jDriver";
// import {InternalError} from "@/app/api/_Error-Handlers/InternalError";
// import {FencingTouch} from "@/types/fencingTouch";
// import {Fencer} from "@/types/fencer";
// import {ETouchTypes} from "@/enums/ETouchTypes";
// import {ETouchSequenceElements} from "@/enums/ETouchSequenceElements";
// import {v4 as uuidv4} from "uuid";
//
// export async function createVideoDraft(videoDraft: VideoDraft): Promise<Response> {
//     try {
//         // Create a Joi schema for VideoDraft
//         // Construct the Neo4j query
//         const neo4jQuery = `
//             CREATE (club:Club {id: $clubId})-[:HAS_DRAFT_VIDEO]->(video:VideoDraft $videoProperties)
//             RETURN video
//         `;
//
//         // Execute the Neo4j query
//         const neo4jResult = await executeNeo4jQuery(neo4jQuery, {
//             clubId: value.club.id,
//             videoProperties: {
//                 id: uuidv4(),
//                 title: value.title,
//                 url: value.url,
//                 leftFencer: {
//                     id: value.leftFencer.id,
//                     name: value.leftFencer.name,
//                 },
//                 rightFencer: {
//                     id: value.rightFencer.id,
//                     name: value.rightFencer.name,
//                 },
//                 touches: value.touches.map((touch: FencingTouch) => ({
//                     id: touch.id,
//                     type: touch.type,
//                     pointAwardedTo: touch.pointAwardedTo.map((fencer: Fencer) => ({
//                         id: fencer.id,
//                         name: fencer.name,
//                     })),
//                     touchAgainst: touch.touchAgainst.map((fencer: Fencer) => ({
//                         id: fencer.id,
//                         name: fencer.name,
//                     })),
//                     sequence: touch.sequence,
//                     videoStartTimeStamp: touch.videoStartTimeStamp,
//                     videoEndTimeStamp: touch.videoEndTimeStamp,
//                     fencingStartTime: touch.fencingStartTime,
//                     fencingEndTime: touch.fencingEndTime,
//                     position: touch.position,
//                 })),
//             },
//         });
//
//         if (neo4jResult.success) {
//             const createdVideo = neo4jResult.data.records[0].get(0).properties; // Adjust this based on your Neo4j result
//             return new Response(JSON.stringify(createdVideo), {
//                 status: 201,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//         } else {
//             return InternalError(neo4jResult.error);
//         }
//     } catch (error) {
//         console.error(error);
//         return InternalError(error);
//     }
// }
