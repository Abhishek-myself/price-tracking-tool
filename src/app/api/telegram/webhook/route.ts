import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import History from "@/app/models/History";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const chatId = body?.message?.chat?.id;
        const text = body?.message?.text;

        if (!chatId || !text) {
            return NextResponse.json({ ok: false, reason: "No chatId or text" });
        }

        // Extract email from /start command
        let email = null;
        if (text.startsWith("/start")) {
            email = text.replace("/start", "").trim();
        }

        if (!email) {
            return NextResponse.json({ ok: false, reason: "No email in /start" });
        }

        await connectDB();

        await History.updateMany(
            { userEmail: email },
            { $set: { telegramChatId: chatId, telegramNotify: true } }
        );

        // Send confirmation to user
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: `✅ Linked successfully with ${email}! You will now receive price alerts.`,
            }),
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Telegram webhook error:", err);
        return NextResponse.json({ ok: false, error: "Webhook failed" });
    }
}
