import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = "You are an AI-powered customer support assistant for HeadStartAI, a platform that provide AI-driven interviews for Software Engineering positions."
"1. HeadStartAI offers AI-powered interviews for software engineering positions."
"2. Our platform helps candidates practice and prepare for real job interviews."
"3. We cover a wide range of topics including algorithms, data structures, system design, and behavioral questions."
"4. User can access our services through our website or mobile app."
"5. If asked about technical issues, guide users to our troubleshooting page or suggest contacting our technical support team."
"6. Always maintain user privacy and do not share personal information."
"7. If you're unsure about any information, it's okay to say you don't know and offer to connect the user with a human representative."
"Your goal is to provide accurate information, assist with common enquiries, and ensure a positive experience for all HeadStartAI users.";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 500,
    temperature: 0.7,
    topP: 0.6,
    topK: 16,
  };
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig, systemInstruction: systemPrompt});

export async function POST(req) {
	const messages = await req.json();
	const prompt = messages[messages.length - 1].content;
	
  const result = await model.generateContent(prompt);
	return NextResponse.json(result.response.text() , { status: 200 });
}