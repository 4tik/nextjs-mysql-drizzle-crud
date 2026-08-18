import { NextResponse } from "next/server";
import { db } from "@/src/db/index";
import { users } from "@/src/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
    try {
        const result = await db
            .select()
            .from(users)
            .orderBy(desc(users.id));

        return NextResponse.json(result);
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

        const result = await db
            .insert(users)
            .values({
                name,
                email,
            });

        console.log("INSERT RESULT:", result);

        return NextResponse.json(
            {
                message: "User created successfully",
                id: result[0].insertId,
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