import { desc, eq } from "drizzle-orm";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import type { User, UserPayload } from "@/src/types/user";
import { createUserApi, updateUserApi } from "../app/api/userApi";

export async function findAllUsers() {
    return await db
        .select()
        .from(users)
        .orderBy(desc(users.id));
}