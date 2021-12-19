export const getJson = (response: Response) => response.json();

export const joinKeyValue = ([key, value]: [string, string | number]) => [key, value].join('=');
