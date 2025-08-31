import { title } from "process";
import { z } from "zod";

export const QuestionType = z.enum(["text", "number", "select", "date"]);
export type QuestionType = z.infer<typeof QuestionType>;

export type Question = {
    key: string,
    title: string,
    description: string,
    type: QuestionType,
    options: string[]
}

export const questions = [
    {key:"fullName", title: "Your Full Name", description: "As on legal docs", type: "text", schema: z.string().min(2, "Name is required")},
    {key:"dob", title: "Date of birth", description: "This is Date of Birth", type: "date", schema: z.string().min(1, "DOB required")},
    {key:"annualIncome", title: "Annual Income (USD)", description: "Help estimate financial readiness", type: "number", schema: z.coerce.number().min(5000)},
    {key:"healthStatus", title: "Cuttent Health Status", description: "General self-assessment", type: "select", options: ["Excellent", "Good", "Fair", "Poor"]}
]