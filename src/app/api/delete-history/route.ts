import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/app/lib/mongodb";
import History from "@/app/models/History";

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
        return NextResponse.json({ error: "Missing history ID" }, { status: 400 });
    }

    await connectDB();

    const result = await History.deleteOne({ _id: id, userEmail: session.user.email });

    if (result.deletedCount === 0) {
        return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
}
