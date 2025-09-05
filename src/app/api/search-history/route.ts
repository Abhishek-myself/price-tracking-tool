
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/app/lib/mongodb";
import History from "@/app/models/History";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();

    const history = await History.find({ userEmail: session.user.email })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("_id productName price url tracking slackNotify emailNotify telegramNotify  "); // Include tracking

    return NextResponse.json(history);
}
