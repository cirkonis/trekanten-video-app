export function DoesntExist(node: string){
    return new Response(`${node} doesnt exists`, {status: 404});
}