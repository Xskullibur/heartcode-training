"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function updateLeaderboard(name: string, quizScore: number) {

    const existingUser = await db.select().from(users).where(eq(users.name, name)).limit(1).then(rows => rows[0]);

    if (existingUser) {

        if (quizScore > existingUser.quizScore) {

            await db.update(users)
                .set({ quizScore })
                .where(eq(users.name, name));
        }
    } else {

        await db.insert(users).values({
            name,
            quizScore
        });
    }
}

export async function getTopScores(limit: number = 10) {
    const topScores = await db.select()
        .from(users)
        .orderBy(desc(users.quizScore))
        .limit(limit);
    return topScores;
}