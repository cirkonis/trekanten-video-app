import {NextApiRequest, NextApiResponse} from "next";
import {executeNeo4jQuery} from "@/app/api/_Neo4j-Utilities/neo4jDriver";

export async function POST(req: NextApiRequest, res: NextApiResponse){
    // Example Neo4j query
    const neo4jQuery = `MATCH (p:Person {name: 'Alice'})
  MERGE (friend:Person {name: 'Bob'})
  MERGE (p)-[:KNOWS]->(friend)`;

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