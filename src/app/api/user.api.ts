import type { User } from "@/src/types/user";

const USER_ENDPOINT = "/api/users";

export async function getUsers(): Promise<User[]> {
    const response = await fetch(USER_ENDPOINT);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.message || "Failed to fetch users"
        );
    }
    return data;
}