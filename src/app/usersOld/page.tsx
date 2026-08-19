"use client";

import { FormEvent, useEffect, useState } from "react";
import type { User, UserPayload } from "@/src/types/user";
import Modal from "@/src/components/Modal";
import { getUsersApi } from "../api/userApi";

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const [formData, setFormData] = useState<UserPayload>({
        name: "",
        email: "",
    });

    const [saving, setSaving] = useState(false);

    async function fetchUsers() {
        try {
            setLoading(true);
            const data = await getUsersApi();
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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchUsers();
    }, []);

    function openCreateModal() {
        setEditingUser(null);

        setFormData({
            name: "",
            email: "",
        });

        setShowModal(true);
    }

    function openEditModal(user: User) {
        setEditingUser(user);

        setFormData({
            name: user.name,
            email: user.email,
        });

        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
        setEditingUser(null);

        setFormData({
            name: "",
            email: "",
        });
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const name = formData.name.trim();
        const email = formData.email.trim();

        if (!name || !email) {
            alert("Name and email are required");
            return;
        }

        try {
            setSaving(true);

            const payload: UserPayload = {
                name,
                email,
            };

            const url = editingUser
                ? `/api/users/${editingUser.id}`
                : "/api/users";

            const method = editingUser ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message || "Failed to save user"
                );
            }

            closeModal();

            await fetchUsers();
        } catch (error) {
            console.error("SAVE USER ERROR:", error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setSaving(false);
        }
    }

    async function deleteUser(id: number) {
        const confirmed = confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(`/api/users/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message || "Failed to delete user"
                );
            }

            await fetchUsers();
        } catch (error) {
            console.error("DELETE USER ERROR:", error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to delete user"
            );
        }
    }

    return (
        <main className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Users
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage your application users
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
                    >
                        + Add User
                    </button>
                </div>

                {/* Card */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                                <tr>
                                    <th className="px-6 py-4">
                                        ID
                                    </th>

                                    <th className="px-6 py-4">
                                        Name
                                    </th>

                                    <th className="px-6 py-4">
                                        Email
                                    </th>

                                    <th className="px-6 py-4">
                                        Created
                                    </th>

                                    <th className="px-6 py-4 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-10 text-center text-slate-500"
                                        >
                                            Loading users...
                                        </td>
                                    </tr>
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-10 text-center"
                                        >
                                            <div className="text-slate-400">
                                                No users found
                                            </div>

                                            <button
                                                type="button"
                                                onClick={openCreateModal}
                                                className="mt-3 text-sm font-medium text-teal-600 hover:text-teal-700"
                                            >
                                                Create your first user
                                            </button>
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="transition hover:bg-slate-50"
                                        >
                                            <td className="px-6 py-4 font-medium text-slate-700">
                                                #{user.id}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 font-semibold text-teal-700">
                                                        {user.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                    <span className="font-medium text-slate-900">
                                                        {user.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-slate-600">
                                                {user.email}
                                            </td>

                                            <td className="px-6 py-4 text-slate-500">
                                                {new Date(
                                                    user.createdAt
                                                ).toLocaleDateString()}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openEditModal(user)
                                                        }
                                                        className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteUser(user.id)
                                                        }
                                                        className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal
                open={showModal}
                onClose={closeModal}
                title={editingUser ? "Edit User" : "Create User"}
            >
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    {/* Name */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Name
                        </label>

                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((previous) => ({
                                    ...previous,
                                    name: e.target.value,
                                }))
                            }
                            placeholder="Enter name"
                            disabled={saving}
                            className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-slate-100"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Email
                        </label>

                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData((previous) => ({
                                    ...previous,
                                    email: e.target.value,
                                }))
                            }
                            placeholder="Enter email"
                            disabled={saving}
                            className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-slate-100"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 border-t border-slate-200 pt-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            disabled={saving}
                            className="border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving
                                ? "Saving..."
                                : editingUser
                                    ? "Update"
                                    : "Submit"}
                        </button>
                    </div>
                </form>
            </Modal>
        </main>
    );
}