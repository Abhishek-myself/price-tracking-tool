import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/app/lib/mongodb";
import TelegramLinkToken from "@/app/models/TelegramLinkToken";
import History from "@/app/models/History";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const { historyId } = await req.json();
        if (!historyId) {
            return NextResponse.json({ error: "Missing historyId" }, { status: 400 });
        }

        await connectDB();

        const hist = await History.findOne({ _id: historyId, userEmail: session.user.email });
        if (!hist) {
            return NextResponse.json({ error: "History not found" }, { status: 404 });
        }

        const token = crypto.randomBytes(16).toString("hex");

        await TelegramLinkToken.create({
            token,
            userEmail: session.user.email,
            historyId,
            used: false,
        });

        const botUsername = process.env.TELEGRAM_BOT_USERNAME;
        if (!botUsername) {
            return NextResponse.json({ error: "Missing TELEGRAM_BOT_USERNAME" }, { status: 500 });
        }

        const deepLink = `https://t.me/${botUsername}?start=${token}`;
        return NextResponse.json({ deepLink });
    } catch (e) {
        console.error("connect-token error", e);
        return NextResponse.json({ error: "Failed to create connect token" }, { status: 500 });
    }
}
