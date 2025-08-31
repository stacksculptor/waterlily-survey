import { auth } from "@clerk/nextjs/server";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";

const updateAnswerSchema = z.object({
    value: z.unknown(),
});

export async function PATCH(
    request: NextRequest,
    {params}: {params: Promise<{id: string, answerId: string}>}
) {
    try {
        const { userId } = await auth.protect();
        const body = await request.json() as unknown;
        const resolveParams = await params;

        const validatedData = updateAnswerSchema.parse(body);

        // Verify the submission belongs to the user
        const submission = await db.submission.findFirst({
            where: {
                id: resolveParams.id,
                userId: userId
            },
            include: {
                answers: true
            }
        });

        if (!submission) {
            return NextResponse.json(
                {error: "Submission not found"},
                {status: 404}
            )
        }

        // Verify the answer belongs to this submission
        const answer = submission.answers.find(a => a.id === resolveParams.answerId);
        if (!answer) {
            return NextResponse.json(
                {error: "Answer not found"},
                {status: 404}
            );
        }

        // Update the answer
        const updateAnswer = await db.answer.update({
            where: {id: resolveParams.answerId},
            data: {value: validatedData.value as string},
        });

        return NextResponse.json(updateAnswer);
    } catch(error) {
        console.error("Answer Update error:", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {error: "Invalid request data", details: error.errors},
                {status: 400}
            )
        }

        return NextResponse.json(
            {error: "Internal Server error"},
            {status: 500}
        )
    }
}