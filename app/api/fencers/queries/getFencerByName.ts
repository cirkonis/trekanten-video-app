import { executeNeo4jQuery } from "@/app/api/_Neo4j-Utilities/neo4jDriver";
import {Fencer} from "@/types/fencer";

export async function getFencerByName(name: string): Promise<Fencer | null> {
    try {
        const neo4jQuery = `
            MATCH (f:Fencer {name: $name})
            RETURN f
        `;

        const neo4jResult = await executeNeo4jQuery(neo4jQuery, {
            name,
        });

        const fencer: Fencer | null = neo4jResult.data.records.length > 0
            ? neo4jResult.data.records.map((record: any) => record.get(0).properties)
            : null;

        return fencer;

    } catch (error) {
        console.error('Error while processing request:', error);
        throw error;
    }
}
