import {
    mysqlTable,
    int,
    varchar,
    timestamp,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: int("id").autoincrement().primaryKey(),

    name: varchar("name", {
        length: 100,
    }).notNull(),

    email: varchar("email", {
        length: 150,
    }).notNull().unique(),

    createdAt: timestamp("created_at")
        .defaultNow()
        .notNull(),
});