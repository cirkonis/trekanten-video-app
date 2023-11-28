import {executeNeo4jQuery} from "@/app/api/_Neo4j-Utilities/neo4jDriver";
export async function GET(req: Request, res: Response) {
    // Example Neo4j query
    const neo4jQuery = 'MATCH (p:Person) RETURN p.name AS name';

    // Execute Neo4j query
    const neo4jResult = await executeNeo4jQuery(neo4jQuery);

    if (res) {
        // Check if data is available in the response
        if (neo4jResult.success && neo4jResult.data && neo4jResult.data.records) {
            // Extract the records array from the response
            const records = neo4jResult.data.records;

            // Send a JSON response with the records
            return new Response(JSON.stringify(records), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            // Handle the case where the data is not in the expected format
            console.error('Unexpected response format:', neo4jResult);
            return new Response('Internal Server Error', {
                status: 500,
            });
        }
    } else {
        console.error('Response object is undefined');
    }
}


export async function POST(req: Request, res: Response){
    // Example Neo4j query
    const neo4jQuery = 'MERGE (p:Person {name: \'Alice\'}) ON CREATE SET p.database = \'neo4j\' ON MATCH SET p.database = \'neo4j\' RETURN p';

    // Execute Neo4j query
    const neo4jResult = await executeNeo4jQuery(neo4jQuery);
    // @ts-ignore
    const records = neo4jResult.data.records.map(record => record.get(0).properties);
    const jsonData = JSON.stringify(records);

    if (res) {
        return new Response(jsonData, {
            status: 200,
        });
    } else {
        console.error('Response object is undefined');
    }
}

export async function PUT(req: Request, res: Response) {

    // Example Neo4j query for updating a person node
    const neo4jQuery = `MATCH (p:Person {name: 'Alice'}) SET p.age = 34 RETURN p`;


    // Execute Neo4j query
    const neo4jResult = await executeNeo4jQuery(neo4jQuery);

    if (res) {
        // Check if the update was successful
        if (neo4jResult.success && neo4jResult.data && neo4jResult.data.records) {
            // Extract the updated record from the response
            const updatedRecord = neo4jResult.data.records[0].get(0).properties;

            // Send a JSON response with the updated record
            return new Response(JSON.stringify(updatedRecord), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            // Handle the case where the update was not successful
            console.error('Failed to update person node:', neo4jResult);
            return new Response('Internal Server Error', {
                status: 500,
            });
        }
    } else {
        console.error('Response object is undefined');
    }
}
export async function DELETE(req: Request, res: Response) {
    const neo4jQuery = `MATCH (p:Person {name: 'Alice'}) DETACH DELETE p`;

    // Execute Neo4j query
    const neo4jResult = await executeNeo4jQuery(neo4jQuery);

    if (res) {
        // Check if the delete was successful
        if (neo4jResult.success) {
            // Send a success response
            return new Response(null, {
                status: 204,
            });
        } else {
            // Handle the case where the delete was not successful
            console.error('Failed to delete person node:', neo4jResult);
            return new Response('Internal Server Error', {
                status: 500,
            });
        }
    } else {
        console.error('Response object is undefined');
    }
}
