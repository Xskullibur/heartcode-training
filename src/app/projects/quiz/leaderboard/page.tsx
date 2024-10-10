"use client";
import { useEffect, useState } from "react";
import { getTopScores } from "@/app/server/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createAvatar } from "@dicebear/core";
import { dylan } from "@dicebear/collection";

export default function Leaderboard() {
  const [topScores, setTopScores] = useState<
    { name: string; id: string; quizScore: number }[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchTopScores() {
      try {
        const scores = await getTopScores();
        if (isMounted) {
          setTopScores(scores);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch top scores:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchTopScores();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-black to-accent">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Top 10 Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <ul className="space-y-4">
              {topScores.map((entry, index) => (
                <li
                  key={entry.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <span
                      className={`text-3xl font-semibold w-8 text-center ${
                        index < 3 ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {`${index + 1}`}
                    </span>
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(
                          createAvatar(dylan, { seed: entry.name }).toString()
                        )}`}
                        alt={entry.name}
                      />
                      <AvatarFallback>
                        {entry.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-lg font-medium">{entry.name}</span>
                  </div>
                  <span className="text-lg font-semibold">
                    {entry.quizScore.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
