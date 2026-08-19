import { findAllUsers } from "@/src/repositories/user.repository";

export async function getUsers() {
    return await findAllUsers();
}