"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

enum QuestionState {
  Hidden,
  Correct,
  Wrong,
}

interface Question {
  question: string;
  options: string[];
  answer: number;
}

const formSchema = z.object({
  answer: z.string({
    required_error: "Please select an option",
  }),
});

const questionList: Question[] = [
  {
    question:
      "The 3 most commonly abused drugs by new abusers arrested in 2019 are?",
    options: [
      "Methamphetamine, New Psychoactive Substances (NPS) and Cannabis",
      "Cannabis, Heroin and Cocaine",
      "Methamphetamine, Cannabis and Cough Syrup",
    ],
    answer: 0,
  },
  {
    question: "More young people are abusing drugs because?",
    options: [
      "Schools are unable to stop them from taking drugs",
      "Young people are not aware of the dangers of drug-abuse",
      "Drugs are easily available and attitudes towards drug-use are more liberal",
    ],
    answer: 2,
  },
  {
    question: "What is one of the main dangers of addiction?",
    options: [
      "Weight gain",
      "Tolerance, leading to the need for increased dosage to achieve the same effect",
      "Loss of appetite",
      "Enhanced physical fitness",
    ],
    answer: 1,
  },
  {
    question:
      "What is a possible outcome if a drug user increases their usual dosage after a period of abstinence?",
    options: [
      "Increased tolerance",
      "Immediate recovery",
      "Death from overdose",
      "Faster metabolism",
    ],
    answer: 2,
  },
];

export default function Quiz() {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    questionList[currentQuestionIdx]
  );
  const [questionState, setQuestionState] = useState(QuestionState.Hidden);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (currentQuestion.answer.toString() === values.answer.toString()) {
      setQuestionState(QuestionState.Correct);
      setScore(score + 1);
    } else {
      setQuestionState(QuestionState.Wrong);
    }

    if (currentQuestionIdx === questionList.length - 1) {
      
      setOpenDialog(true);

      const end = Date.now() + 3 * 1000; // 3 seconds
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
   
      const frame = () => {
        if (Date.now() > end) return;
   
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });
   
        requestAnimationFrame(frame);
      };
   
      frame();
    }
  }

  function handleNextQuestion() {
    if (currentQuestionIdx < questionList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIdx + 1);
      setCurrentQuestion(questionList[currentQuestionIdx + 1]);
      setQuestionState(QuestionState.Hidden);
      form.reset({
        answer: "",
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-black to-accent">
      
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className="text-center">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Congratulations!!!</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="text-4xl">
            {score} / {questionList.length}
          </AlertDialogDescription>
          <AlertDialogFooter className="sm:justify-center mt-5">
            <AlertDialogAction onClick={() => {
              router.push("/");
            }}>Back to home</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4"></div>
          <CardTitle className="text-2xl font-bold">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardContent className="text-left">
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="space-y-3"
                      >
                        {currentQuestion.options.map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem
                                  value={index.toString()}
                                  id={`${index}`}
                                  disabled={questionState !== QuestionState.Hidden}
                                />
                              </FormControl>

                              <FormLabel
                                htmlFor={`${index}`}
                                className="text-lg"
                              >
                                {option}
                              </FormLabel>
                            </FormItem>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {questionState === QuestionState.Correct && (
                <Alert className="mt-8" variant={"success"}>
                  <AlertTitle>Correct!</AlertTitle>
                </Alert>
              )}

              {questionState === QuestionState.Wrong && (
                <Alert className="mt-8" variant={"destructive"}>
                  <AlertTitle>Incorrect!</AlertTitle>
                  <AlertDescription>
                    The correct answer is:{" "}
                    {currentQuestion.options[currentQuestion.answer]}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>

            <CardFooter className="flex justify-center space-x-4">
              {questionState === QuestionState.Hidden && (
                <Button type="submit">Submit</Button>
              )}

              {questionState !== QuestionState.Hidden &&
                currentQuestionIdx !== questionList.length - 1 && (
                  <Button onClick={handleNextQuestion}>Next</Button>
                )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
