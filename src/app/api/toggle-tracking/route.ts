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

        const { id, tracking } = await req.json();

        if (!id || typeof tracking !== "boolean") {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        await connectDB();

        const updated = await History.findOneAndUpdate(
            { _id: id, userEmail: session.user.email },
            { tracking },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, tracking: updated.tracking });
    } catch (err) {
        console.error("Toggle tracking error:", err);
        return NextResponse.json({ error: "Failed to update tracking" }, { status: 500 });
    }
}
