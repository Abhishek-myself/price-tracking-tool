import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/app/lib/mongodb";
import History from "@/app/models/History";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const historyId = searchParams.get("historyId");
        if (!historyId) {
            return NextResponse.json({ error: "Missing historyId" }, { status: 400 });
        }

        await connectDB();
        const hist = await History.findOne({ _id: historyId, userEmail: session.user.email });
        if (!hist) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json({
            enabled: Boolean(hist.telegramNotify && hist.telegramChatId),
            telegramNotify: Boolean(hist.telegramNotify),
            hasChatId: Boolean(hist.telegramChatId),
        });
    } catch (e) {
        console.error("status error", e);
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
