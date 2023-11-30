import { executeNeo4jQuery } from "@/app/api/_Neo4j-Utilities/neo4jDriver";
import { Club } from "@/types/club";

export async function getClubByName(name: string): Promise<Club | null> {
    try {
        const neo4jQuery = `
            MATCH (c:Club {name: $name})
            RETURN c
        `;

        const neo4jResult = await executeNeo4jQuery(neo4jQuery, {
            name,
        });

        const club: Club | null = neo4jResult.data.records.length > 0
            ? neo4jResult.data.records.map((record: any) => record.get(0).properties)
            : null;

        return club;

    } catch (error) {
        console.error('Error while processing request:', error);
        throw error;
    }
}
