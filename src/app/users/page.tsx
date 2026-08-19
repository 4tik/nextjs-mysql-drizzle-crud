"use client";

import { useEffect, useState } from "react";
import type { User } from "@/src/types/user";
import { getUsers } from "@/src/app/api/user.api";

export default function UserPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchUsers() {
        try {
            setLoading(true);
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error("FETCH USERS ERROR:", error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to fetch users"
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading users...</div>;
    }

    return (
        <main>
            <h1>Users</h1>

            {users.map((user) => (
                <div key={user.id}>
                    <strong>{user.name}</strong>
                    <span> - {user.email}</span>
                </div>
            ))}
        </main>
    );
}