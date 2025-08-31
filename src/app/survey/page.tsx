"use client"

import { useState, useMemo } from "react";
import { questions } from "./questions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Form } from "~/components/ui/form";

import z from "zod";

const createSchema = () => {
    const schemaFields: Record<string, z.ZodSchema> = {};

    questions.forEach(question => {
        schemaFields[question.key] = question.schema;
    })

    return z.object(schemaFields);
}

const schema = createSchema();
type FormValues = z.infer<typeof schema>;

export default function SurveyPage() {
    const [index ] = useState(0);
    const progress = useMemo(() => Math.round(((index + 1) / questions.length) * 100), [index]);
    // const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: questions.reduce((acc, question) => {
            acc[question.key] = "";
            return acc;
        }, {} as Record<string, string>),
    });


    return (
        <div className="mx-auto max-w-2xl">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-center mb-2">Long-Term Care Survey</h1>
                <p className="text-center text-muted-foreground">
                    Help us understand your requirement and status for long-term care planning
                </p>
            </div>
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                        Question {index + 1} of {questions.length}
                    </span>
                    <span className="text-sm text-muted-foreground">
                        {progress} % Complete
                    </span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            <Form {...form}>
                <form>
                    <Card>
                        <CardHeader>

                        </CardHeader>
                        <CardContent>

                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    )
}