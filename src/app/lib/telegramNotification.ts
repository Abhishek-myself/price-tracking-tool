// // // app/lib/telegramNotification.ts
// // export async function sendTelegramNotification({
// //     chatId,
// //     productName,
// //     oldPrice,
// //     newPrice,
// //     url
// // }: {
// //     chatId: string;
// //     productName: string;
// //     oldPrice: string;
// //     newPrice: string;
// //     url: string;
// // }) {
// //     const token = process.env.TELEGRAM_BOT_TOKEN;
// //     if (!token || !chatId) {
// //         console.error("Telegram Bot Token or Chat ID missing");
// //         return;
// //     }

// //     const text = `📉 Price Drop Alert!\n\n*${productName}*\nOld: ${oldPrice}\nNew: ${newPrice}\n\n[View Product](${url})`;

// //     await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //             chat_id: 1662663807,
// //             text,
// //             parse_mode: "Markdown"
// //         }),
// //     });
// // }

// // app/lib/telegramNotification.ts
// // export async function sendTelegramNotification({

// //     productName,
// //     oldPrice,
// //     newPrice,
// //     url,
// //     chatId,
// // }: {

// //     productName: string;
// //     oldPrice: string;
// //     newPrice: string;
// //     url: string;
// //     chatId?: string;
// // }) {
// //     const token = process.env.TELEGRAM_BOT_TOKEN;
// //     // const chatId = process.env.TELEGRAM_CHAT_ID;

// //     if (!token || !chatId) {
// //         console.error("Telegram Bot Token or Chat ID missing");
// //         return;
// //     }

// //     const text = `📉 Price Drop Alert!\n\n*${productName}*\nOld: ${oldPrice}\nNew: ${newPrice}\n\n[View Product](${url})`;

// //     const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //             chat_id: chatId,
// //             text,
// //             parse_mode: "Markdown",
// //         }),
// //     });

// //     const data = await response.json();
// //     if (!data.ok) {
// //         console.error("Telegram API error:", data);
// //     }
// // }


// export async function sendTelegramNotification({
//     productName,
//     oldPrice,
//     newPrice,
//     url,
//     chatId,
// }: {
//     productName: string;
//     oldPrice: string;
//     newPrice: string;
//     url: string;
//     chatId?: string; // <-- Add this
// }) {
//     const token = process.env.TELEGRAM_BOT_TOKEN;
//     const finalChatId = chatId || process.env.TELEGRAM_CHAT_ID;

//     if (!token || !finalChatId) {
//         console.error("Telegram Bot Token or Chat ID missing");
//         return;
//     }

//     const text = `📉 Price Drop Alert!\n\n*${productName}*\nOld: ${oldPrice}\nNew: ${newPrice}\n\n[View Product](${url})`;

//     const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             chat_id: finalChatId,
//             text,
//             parse_mode: "Markdown",
//         }),
//     });

//     const data = await response.json();
//     if (!data.ok) {
//         console.error("Telegram API error:", data);
//     }
// }



export async function sendTelegramNotification({
    chatId,
    productName,
    oldPrice,
    newPrice,
    url,
}: {
    chatId: string;
    productName: string;
    oldPrice: string;
    newPrice: string;
    url: string;
}) {
    try {
        await fetch(
            `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: `📉 Price Drop Alert!\n\n${productName}\nOld Price: ${oldPrice}\nNew Price: ${newPrice}\n\nLink: ${url}`,
                }),
            }
        );
    } catch (err) {
        console.error("Telegram send error:", err);
    }
}
