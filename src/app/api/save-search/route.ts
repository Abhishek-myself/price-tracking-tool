
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/app/lib/mongodb";
import History from "@/app/models/History";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { productName, price, url } = await req.json();

    if (!productName || !price || !url) {
        return NextResponse.json({ error: "Missing product data" }, { status: 400 });
    }

    await connectDB();

    // Add new search
    await History.create({
        userEmail: session.user.email,
        productName,
        price,
        url

    });

    // Keep only latest 5 entries per user
    const userSearches = await History.find({ userEmail: session.user.email })
        .sort({ createdAt: -1 })
        .skip(5); // skip first 5 latest

    if (userSearches.length > 0) {
        const idsToDelete = userSearches.map((item) => item._id);
        await History.deleteMany({ _id: { $in: idsToDelete } });
    }

    return NextResponse.json({ success: true });
}
