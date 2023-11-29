import {executeNeo4jQuery} from "@/app/api/_Neo4j-Utilities/neo4jDriver";
import {getUserById} from "@/app/api/users/crud/getUserById";
import {User} from "@/types/user";
import {DoesntExist} from "@/app/api/_Error-Handlers/DoesntExist";

export async function updateUser(id: string, name: string, password: string): Promise<Response> {
    try {
        const userExist = await getUserById(id);

        if (!userExist) {
            //  if the user doesn't exist, return null or handle it as needed
            console.error('user does not exists');
            return DoesntExist('User');
        }

        const neo4jQuery = `
    MATCH (u:User {id: $id})
    SET u.name = $name, u.password = $password
    RETURN u
  `;


        const neo4jResult = await executeNeo4jQuery(neo4jQuery, {
            id: id,
            name: name,
            password: password,
        });

        if (neo4jResult.data.records.length === 0) {
            console.error('No user found with the specified ID');
            return DoesntExist('User');
        }

        const firstRecord = neo4jResult.data.records[0];

        if (!firstRecord || !firstRecord.get(0)) {
            console.error('Invalid result structure, cannot read user properties');
            // Handle the error or return an appropriate response
        }

        const updatedUser = firstRecord.get(0).properties;

        return new Response(JSON.stringify(updatedUser), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        throw error;
    }
}