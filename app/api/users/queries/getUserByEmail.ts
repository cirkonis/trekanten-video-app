import { executeNeo4jQuery } from "@/app/api/_Neo4j-Utilities/neo4jDriver";
import { User } from "@/types/user";

export async function getUserByEmail(email: string): Promise<User | null> {
    try {
        const neo4jQuery = `
            MATCH (u:User {email: $email})
            RETURN u
        `;

        const neo4jResult = await executeNeo4jQuery(neo4jQuery, {
            email,
        });

        const user: User | null = neo4jResult.data.records.length > 0
            ? neo4jResult.data.records.map((record: any) => record.get(0).properties)
            : null;

        return user;

    } catch (error) {
        console.error('Error while processing request:', error);
        throw error;
    }
}
