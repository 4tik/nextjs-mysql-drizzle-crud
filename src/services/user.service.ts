import { desc, eq } from "drizzle-orm";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import type { User, UserPayload } from "@/src/types/user";
import { createUserApi, updateUserApi } from "../app/api/userApi";

export async function getUsers() {
    return await db
        .select()
        .from(users)
        .orderBy(desc(users.id));
}

export async function saveUser(
    payload: UserPayload,
    id?: number
): Promise<User> {

    if (id) {
        return await updateUserApi(id, payload);
    }

    return await createUserApi(payload);
}

export async function getUserById(id: number) {
    const result = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

    return result[0] ?? null;
}

export async function createUser(data: UserPayload) {
    const result = await db
        .insert(users)
        .values({
            name: data.name,
            email: data.email,
        });

    const id = Number(result[0].insertId);

    return getUserById(id);
}

export async function updateUser(
    id: number,
    data: UserPayload
) {
    const existingUser = await getUserById(id);

    if (!existingUser) {
        return null;
    }

    await db
        .update(users)
        .set({
            name: data.name,
            email: data.email,
        })
        .where(eq(users.id, id));

    return getUserById(id);
}

export async function deleteUser(id: number) {
    const existingUser = await getUserById(id);

    if (!existingUser) {
        return false;
    }

    await db
        .delete(users)
        .where(eq(users.id, id));

    return true;
}