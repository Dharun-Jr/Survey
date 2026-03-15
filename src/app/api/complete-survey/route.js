import { NextResponse } from "next/server";
import getClientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { sessionId, xpEarned } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing sessionId" },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    const db = client.db("surveyDB");
    const collection = db.collection("surveyResponses");

    await collection.updateOne(
      { sessionId },
      {
        $set: {
          completed: true,
          endTime: new Date(),
          xpEarned: xpEarned || 0,
        },
      }
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error completing survey:", error);
    return NextResponse.json(
      { error: "Failed to complete survey" },
      { status: 500 }
    );
  }
}
