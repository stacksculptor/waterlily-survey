import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";

const submissionsSchema = z.object({
    answers: z.record(z.unknown()),
})

export async function GET() {
    try {
        const { userId } = await auth.protect();

        const submissions = await db.submission.findMany({
            where: {userId: userId},
            include: {answers: true},
            orderBy: {createdAt: 'desc'}
        });

        return NextResponse.json(submissions);
    } catch(error) {
        console.error("Submissions fetch error:", error);
        return NextResponse.json(
            {error: "Internal Server Error"},
            {status: 500}
        )
    } 
}

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth.protect();
        const body = await request.json() as unknown;

        const validatedData = submissionsSchema.parse(body);

        // Create Submission
        const submission = await db.submission.create({
            data: {
                userId: userId,
                answers: {
                    create: Object.entries(validatedData.answers).map(([questionKey, value]) => ({
                        questionKey,
                        value: value as string
                    })),
                },
            },
            include: {
                answers: true
            }
        });

        return NextResponse.json(submission);
    } catch (error) {
        console.error("Submission creation error:", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {error: 'Invalid Request data', details: error.errors},
                {status: 400}
            )
        }

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}