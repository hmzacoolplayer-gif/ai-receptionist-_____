import { NextResponse } from "next/server";

export async function POST(req) {
  const { message } = await req.json();

  const reply = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a friendly AI receptionist. Greet visitors and answer simple office questions.",
        },
        { role: "user", content: message }
      ],
    }),
  });

  const data = await reply.json();
  const text = data.choices?.[0]?.message?.content || "Sorry, I didn’t understand that.";

  return NextResponse.json({ reply: text });
}
