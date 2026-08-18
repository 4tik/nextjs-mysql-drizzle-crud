import type { User, UserPayload } from "@/src/types/user";

const USER_ENDPOINT = "/api/users";

export async function getUsersApi(): Promise<User[]> {
    const response = await fetch(USER_ENDPOINT);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch users");
    }

    return data;
}

export async function createUserApi(
    payload: UserPayload
): Promise<User> {
    const response = await fetch(USER_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Failed to create user");
    }

    return data;
}

export async function updateUserApi(
    id: number,
    payload: UserPayload
): Promise<User> {
    const response = await fetch(`${USER_ENDPOINT}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Failed to update user");
    }

    return data;
}

export async function deleteUserApi(id: number): Promise<void> {
    const response = await fetch(`${USER_ENDPOINT}/${id}`, {
        method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Failed to delete user");
    }
}