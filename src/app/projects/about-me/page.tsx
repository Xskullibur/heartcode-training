import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";
import LogoImage from "@/app/assets/logo.jpg";
import Link from "next/link";

export default function AboutMe() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-secondary">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src={LogoImage}
              alt="Profile Picture"
              width={128}
              height={128}
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <CardTitle className="text-2xl font-bold">Alson Sim</CardTitle>
          <CardDescription>SMU • Computer Science • Year 2</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p>
            Hello! I&apos;m a passionate web developer with about 4 years of
            experience. When I&apos;m not coding, you can find me playing computer games, 
            reading sci-fi novels and mangas, and watching movies.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button variant="outline" size="icon">
            <Github className="h-4 w-4" />
            <Link className="sr-only" href="https://github.com/Xskullibur">GitHub</Link>
          </Button>
          <Button variant="outline" size="icon">
            <Linkedin className="h-4 w-4" />
            <Link className="sr-only" href="https://www.linkedin.com/in/alson-sim/">LinkedIn</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
