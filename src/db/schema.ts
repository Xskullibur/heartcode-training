import { integer, pgTable, pgTableCreator, uuid, varchar } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `heartcode_training_${name}`)

export const users = pgTable("users", {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    quizScore: integer().notNull(),
});