import { NextResponse } from "next/server";
import {
    getUsers,
    createUser,
} from "@/src/services/user.service";

export async function GET() {
    try {
        const users = await getUsers();

        return NextResponse.json(users);
    } catch (error) {
        console.error("GET USERS ERROR:", error);

        return NextResponse.json(
            {
                message: "Failed to fetch users",
                error: String(error),
            },
            {
                status: 500,
            }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        console.log("REQUEST BODY:", body);

        const name = body.name?.trim();
        const email = body.email?.trim();

        if (!name || !email) {
            return NextResponse.json(
                {
                    message: "Name and email are required",
                },
                {
                    status: 400,
                }
            );
        }

        const user = await createUser({
            name,
            email,
        });

        return NextResponse.json(
            {
                message: "User created successfully",
                user,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error("CREATE USER ERROR:", error);

        return NextResponse.json(
            {
                message: "Failed to create user",
                error: String(error),
            },
            {
                status: 500,
            }
        );
    }
}