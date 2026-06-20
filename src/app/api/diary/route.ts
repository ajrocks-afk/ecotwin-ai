import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {
  try {
    const { score } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are EcoTwin.

Write a diary entry under 80 words.

Score: ${score}

If score is high, sound healthy and vibrant.
If score is low, sound tired and polluted.

Write in first person.
`;

    const result = await model.generateContent(prompt);

    return NextResponse.json({
      diary: result.response.text(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}