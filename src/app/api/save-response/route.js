import { NextResponse } from "next/server";
import getClientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { sessionId, questionId, answer } = await request.json();

    if (!sessionId || !questionId || answer === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    const db = client.db("surveyDB");
    const collection = db.collection("surveyResponses");

    await collection.updateOne(
      { sessionId },
      {
        $push: {
          answers: {
            questionId,
            answer,
            timestamp: new Date(),
          },
        },
      }
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error saving response:", error);
    return NextResponse.json(
      { error: "Failed to save response" },
      { status: 500 }
    );
  }
}
