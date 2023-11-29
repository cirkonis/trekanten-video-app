export function InternalError(error: any){
    console.error('Error while processing request:', error);
    return new Response('Internal Server Error', {
        status: 500,
    });
}