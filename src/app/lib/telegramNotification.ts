const TELEGRAM_API = "https://api.telegram.org";

export async function sendTelegramNotification({
    productName,
    oldPrice,
    newPrice,
    url,
    chatId,
}: {
    productName: string;
    oldPrice: string;
    newPrice: string;
    url: string;
    chatId: string;
}) {
    try {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        if (!token || !chatId) {
            console.error("Telegram Bot Token or chatId missing");
            return;
        }

        const text =
            `📉 *Price Drop Alert!*\n` +
            `*${productName}*\n` +
            `Old: ${oldPrice}\nNew: ${newPrice}\n` +
            `[View Product](${url})`;

        await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text,
                parse_mode: "Markdown",
                disable_web_page_preview: false,
            }),
        });
    } catch (e) {
        console.error("Telegram send error", e);
    }
}
