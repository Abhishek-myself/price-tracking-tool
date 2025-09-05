

import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import TelegramLinkToken from "@/app/models/TelegramLinkToken";
import History from "@/app/models/History";
import User from "@/app/models/User";

const TELEGRAM_API = "https://api.telegram.org";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const message = body?.message || body?.edited_message;
        if (!message) return NextResponse.json({ ok: true });

        const chatId = String(message.chat?.id || "");
        const text: string = String(message.text || "");

        await connectDB();

        // Handle /start <token>
        const match = text.match(/^\/start\s+([A-Za-z0-9]+)$/);
        if (match) {
            const token = match[1];
            const link = await TelegramLinkToken.findOne({ token, used: false });
            if (!link) {
                await sendText(chatId, "⚠️ Link expired or invalid. Please reconnect from the website.");
                return NextResponse.json({ ok: true });
            }

            // Save chatId in User (global)
            const user = await User.findOne({ email: link.userEmail });
            if (user) {
                user.telegramChatId = chatId;
                await user.save();
            }

            // Enable telegramNotify for that specific history entry
            const hist = await History.findOne({ _id: link.historyId, userEmail: link.userEmail });
            if (hist) {
                hist.telegramNotify = true;
                await hist.save();
            }

            // Mark token used
            link.used = true;
            await link.save();

            await sendText(chatId, `✅ Telegram connected!\nYou'll now get price alerts here for:\n• ${hist?.productName || "your products"}`);
            return NextResponse.json({ ok: true });
        }

        // Handle /stop -> disable all telegramNotify for that user
        if (/^\/stop$/.test(text.trim())) {
            const user = await User.findOne({ telegramChatId: chatId });
            if (user) {
                await History.updateMany(
                    { userEmail: user.email },
                    { telegramNotify: false }
                );
            }
            await sendText(chatId, "🔕 All Telegram notifications disabled for your products.");
            return NextResponse.json({ ok: true });
        }

        // Fallback for plain /start
        if (/^\/start$/.test(text.trim())) {
            await sendText(chatId, "Hi 👋 Please use the special link from the website to connect your account.");
        }

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error("webhook error", e);
        return NextResponse.json({ ok: true });
    }
}

async function sendText(chatId: string, text: string) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token || !chatId) return;
    await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
    });
}
