import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function handleAIRequest(userMessage) {
  try {
    const question = userMessage.replace(/@monk/i, '').trim();

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Updated to supported model
      messages: [
        {
          role: "system",
          content: "You are ChatMonk, a friendly senior developer who gives clean, short explanations and sample code. Reply helpful, concise, and code-focused. Format code blocks with triple backticks and language identifier."
        },
        {
          role: "user",
          content: question
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('AI API error:', error);
    return "Sorry, I'm having trouble connecting to my AI brain right now. Please try again later! 🤔";
  }
}