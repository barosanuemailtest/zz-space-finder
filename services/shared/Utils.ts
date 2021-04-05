



export function generateRandomString(): string{
    return Math.random().toString(36).slice(2);
}

export function parseEventBody(body: string | null): any{
    return typeof body == 'object'? body :JSON.parse(body);
}