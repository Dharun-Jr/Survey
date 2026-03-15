import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import getClientPromise from "@/lib/mongodb";

export async function POST() {
  try {
    const client = await getClientPromise();
    const db = client.db("surveyDB");
    const collection = db.collection("surveyResponses");

    const sessionId = uuidv4();
    const startTime = new Date();

    await collection.insertOne({
      sessionId,
      answers: [],
      startTime,
      endTime: null,
      xpEarned: 0,
      completed: false,
    });

    return NextResponse.json({ sessionId, startTime }, { status: 201 });
  } catch (error) {
    console.error("Error starting session:", error);
    return NextResponse.json(
      { error: "Failed to start session" },
      { status: 500 }
    );
  }
}
