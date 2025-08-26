export async function sendSlackNotification({
    productName,
    oldPrice,
    newPrice,
    difference,
    change,
    url,
    user,
}: {
    productName: string;
    oldPrice: string;
    newPrice: string;
    difference: number;
    change: "increase" | "decrease";
    url: string;
    user: string;
}) {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) return;

    const message = {
        text: `🔔 *Price ${change.toUpperCase()} Detected!*
*Product:* ${productName}
*Old Price:* ${oldPrice}
*New Price:* ${newPrice}
*Difference:* ${difference}
*User:* ${user}
*Link:* ${url}`,
    };

    await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
    });
}
