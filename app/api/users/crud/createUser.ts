import {executeNeo4jQuery} from "@/app/api/_Neo4j-Utilities/neo4jDriver";
import {User} from "@/types/user";
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';
import {getUserByEmail} from "@/app/api/users/crud/getUserByEmail";
import {AlreadyExist} from "@/app/api/_Error-Handlers/AlreadyExist";

export async function createUser(name: string, email: string, password: string): Promise<Response> {
      try {
          // Check if a user with the same email, name, and password already exists
          const existingUser = await getUserByEmail(email);

          if (existingUser) {
              // If a user with the same credentials exists, return null or handle it as needed
              console.error('User with the same email already exists');
              return AlreadyExist('User', 'email');
          }

          // If no user with the same credentials exists, proceed to create the new user
          const newUser: User = {
              id: uuidv4(),
              name,
              email,
              password,
              created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          };

          const neo4jQuery = `
            MERGE (u:User {email: $email})
            ON CREATE SET u.id = $id, u.name = $name, u.created_at = $created_at, u.password = $password
            RETURN u
        `;

          const neo4jResult = await executeNeo4jQuery(neo4jQuery, {
              name: newUser.name,
              email: newUser.email,
              password: newUser.password,
              created_at: newUser.created_at,
              id: newUser.id,
          });

         const createdUser = neo4jResult.data.records[0].get(0).properties;

          return new Response(JSON.stringify(createdUser), {
              status: 201,
              headers: {
                  'Content-Type': 'application/json',
              },
          });

      } catch (error) {
          throw error;
      }

}
