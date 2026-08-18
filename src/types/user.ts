export type User = {
    id: number;
    name: string;
    email: string;
    createdAt: string;
};

export type UserPayload = {
    name: string;
    email: string;
};