import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import History from "@/app/models/History";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    await connectDB();
    const { type } = await req.json();
    const history = await History.findById(params.id);

    if (!history) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    if (type === "slack") history.slackNotify = !history.slackNotify;
    if (type === "email") history.emailNotify = !history.emailNotify;
    if (type === "telegram") history.telegramNotify = !history.telegramNotify;

    await history.save();
    return NextResponse.json({ success: true });
}
