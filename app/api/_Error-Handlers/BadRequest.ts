export function BadRequest() {
    return new Response(`Bad Request`, {
        status: 400,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
