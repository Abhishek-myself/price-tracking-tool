import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/app/lib/mongodb";
import History from "@/app/models/History";

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const { id, type, value } = await req.json();
        if (!id || !type || typeof value !== "boolean") {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        if (!["slackNotify", "emailNotify"].includes(type)) {
            return NextResponse.json({ error: "Invalid notification type" }, { status: 400 });
        }

        await connectDB();

        const updated = await History.findOneAndUpdate(
            { _id: id, userEmail: session.user.email },
            { [type]: value },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, [type]: updated[type] });
    } catch (err) {
        console.error("Toggle notification error:", err);
        return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
    }
}



