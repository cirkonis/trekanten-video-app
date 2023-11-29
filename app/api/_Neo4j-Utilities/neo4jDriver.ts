import { auth, driver, Session, Transaction } from 'neo4j-driver';

type Neo4jQueryResult = {
    success?: boolean;
    data?: any;
    error?: string;
};

export async function executeNeo4jQuery(
    query: string,
    params?: any
): Promise<Neo4jQueryResult> {
    const { NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD } = process.env;
    const neo4jUri = NEO4J_URI || 'bolt://localhost:7687';
    const neo4jUser = NEO4J_USER || 'neo4j';
    const neo4jPassword = NEO4J_PASSWORD || 'password';

    const session = driver(neo4jUri, auth.basic(neo4jUser, neo4jPassword)).session();
    let transaction: Transaction | undefined;

    try {
        // Begin a transaction
        transaction = session.beginTransaction();

        // Execute the query within the transaction
        const result = await transaction.run(query, params);

        // Commit the transaction if successful
        await transaction.commit();

        return { success: true, data: result };
    } catch (error) {
        // Rollback the transaction if an error occurs
        if (transaction) {
            await transaction.rollback();
        }

        console.error('Error executing Neo4j query:', error);
        return { error: 'Internal Server Error' };
    } finally {
        // Close the session
        await session.close();
    }
}
