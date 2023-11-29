import { executeNeo4jQuery } from "@/app/api/_Neo4j-Utilities/neo4jDriver";

export async function listUsers() {
    const neo4jQuery = 'MATCH (u:User) RETURN u';

    const neo4jResult = await executeNeo4jQuery(neo4jQuery);

    if (neo4jResult.success && neo4jResult.data && neo4jResult.data.records) {
        const users = neo4jResult.data.records.map((record: any) => record.get(0).properties);
        return users; // Return the user data directly
    } else {
        console.error('Failed to retrieve users:', neo4jResult);
        throw new Error('Internal Server Error');
    }
}
