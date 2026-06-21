import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { canRequest } from "@/lib/rateLimiter";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {
  try {

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key missing" },
        { status: 500 }
      );
    }

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
    const ip =
      (await headers()).get("x-forwarded-for") ??
      "anonymous";

    if (!canRequest(ip)) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }
    if (!score || typeof score !== "number") {
      return NextResponse.json(
        { error: "Invalid score provided" },
        { status: 400 }
      );
    }

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