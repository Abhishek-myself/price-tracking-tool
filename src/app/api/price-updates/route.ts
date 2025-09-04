


// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { connectDB } from "@/app/lib/mongodb";
// import History from "@/app/models/History";
// import { scrapePrice } from "@/app/lib/scrapePrice";

// export async function GET() {
//     try {
//         const session = await getServerSession(authOptions);
//         if (!session?.user?.email) {
//             return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//         }

//         await connectDB();

//         // ✅ Get last 5 search history of this user
//         const searches = await History.find({ userEmail: session.user.email })
//             .sort({ createdAt: -1 })
//             .limit(5);

//         let updates: {
//             productName: string;
//             oldPrice: string;
//             newPrice: string;
//             difference: number;
//             change: "increase" | "decrease" | "same";
//             url: string;
//         }[] = [];

//         for (const s of searches) {
//             // 🔹 Scrape fresh price from URL (not productName!)
//             const result = await scrapePrice(s.url);
//             // if (!result) continue;
//             // ⛔ if product is deleted/unavailable, skip updating
//             if (!result || !result.price || !result.name) {
//                 console.warn(`Product deleted or unavailable: ${s.url}`);
//                 continue;
//             }

//             const newPriceNum = Number(result.price.replace(/[^\d]/g, "")) || 0;
//             const oldPriceNum = Number(s.price.replace(/[^\d]/g, "")) || 0;

//             let change: "increase" | "decrease" | "same" = "same";
//             if (newPriceNum > oldPriceNum) change = "increase";
//             else if (newPriceNum < oldPriceNum) change = "decrease";

//             if (change !== "same") {
//                 updates.push({
//                     productName: s.productName,
//                     oldPrice: s.price,
//                     newPrice: result.price,
//                     difference: newPriceNum - oldPriceNum,
//                     change,
//                     url: s.url,
//                 });

//                 // update DB with new price
//                 s.price = result.price;
//                 await s.save();
//             }
//         }

//         return NextResponse.json(updates);
//     } catch (err) {
//         console.error("Price update error:", err);
//         return NextResponse.json({ error: "Failed to check price updates" }, { status: 500 });
//     }
// }


import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/app/lib/mongodb";
import History from "@/app/models/History";
import { scrapePrice } from "@/app/lib/scrapePrice";
import { sendEmailNotification } from "@/app/lib/emailNotification"; // ✅ Import email notification
import { sendSlackNotification } from "@/app/lib/slackNotification"; // ✅ Import Slack notification
import { sendTelegramNotification } from "@/app/lib/telegramNotification";
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        await connectDB();

        // const searches = await History.find({ userEmail: session.user.email })
        //     .sort({ createdAt: -1 })
        //     .limit(5);
        const searches = await History.find({
            userEmail: session.user.email,
            tracking: true
        }).sort({ createdAt: -1 }).limit(5);

        let updates: {
            productName: string;
            oldPrice: string;
            newPrice: string;
            difference: number;
            change: "increase" | "decrease" | "same";
            url: string;
        }[] = [];

        for (const s of searches) {
            const result = await scrapePrice(s.url);
            if (!result || !result.price || !result.name) {
                console.warn(`Product deleted or unavailable: ${s.url}`);
                continue;
            }

            // const newPriceNum = Number(result.price.replace(/[^\d]/g, "")) || 0;
            // const oldPriceNum = Number(s.price.replace(/[^\d]/g, "")) || 0;
            const newPriceNum = Number(result.price.replace(/[^0-9.]/g, "")) || 0;
            const oldPriceNum = Number(s.price.replace(/[^0-9.]/g, "")) || 0;




            let change: "increase" | "decrease" | "same" = "same";
            if (newPriceNum > oldPriceNum) change = "increase";
            else if (newPriceNum < oldPriceNum) change = "decrease";
            const oldPrice = s.price;
            // if (change === "decrease") {
            //     updates.push({
            //         productName: s.productName,
            //         oldPrice: s.price,
            //         newPrice: result.price,
            //         difference: newPriceNum - oldPriceNum,
            //         change,
            //         url: s.url,
            //     });

            //     // Update DB with new price
            //     s.price = result.price;
            //     await s.save();
            // **Your new condition here**
            // if (change === "decrease" && newPriceNum !== s.lastNotifiedPrice) {
            //     updates.push({
            //         productName: s.productName,
            //         oldPrice: s.price,
            //         newPrice: result.price,
            //         difference: newPriceNum - oldPriceNum,
            //         change,
            //         url: s.url,
            //     });

            //     s.price = result.price;
            //     s.lastNotifiedPrice = newPriceNum; // Update last notified price
            //     await s.save();



            // Check if price dropped AND hasn't been notified for this price
            if (change === "decrease" && s.lastNotifiedPrice !== result.price) {
                updates.push({
                    productName: s.productName,
                    oldPrice: s.price,
                    newPrice: result.price,
                    difference: newPriceNum - oldPriceNum,
                    change,
                    url: s.url,
                });

                // Update DB: current price & lastNotifiedPrice
                s.price = result.price;
                s.lastNotifiedPrice = result.price;
                await s.save();

                // ✅ Send Slack notification
                if (s.slackNotify) {
                    await sendSlackNotification({
                        productName: s.productName,
                        oldPrice: oldPrice,
                        newPrice: result.price,
                        difference: newPriceNum - oldPriceNum,
                        change,
                        url: s.url,
                        user: session.user.email, // Include user who triggered update
                    });
                }
                // Send Email notification
                if (s.emailNotify) {
                    await sendEmailNotification({
                        to: session.user.email,
                        productName: s.productName,
                        oldPrice: oldPrice,
                        newPrice: result.price,
                        url: s.url
                    });
                }

            }
        }
        return NextResponse.json(updates);
    } catch (err) {
        console.error("Price update error:", err);
        return NextResponse.json({ error: "Failed to check price updates" }, { status: 500 });
    }
}


