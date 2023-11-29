export function AlreadyExist(node: string, property: string){
    return new Response(`${node} with the same ${property} already exists`, {status: 409});
}