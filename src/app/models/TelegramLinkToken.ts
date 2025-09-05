import mongoose, { Schema, Document } from "mongoose";

interface TelegramLinkTokenDoc extends Document {
    token: string;
    userEmail: string;
    historyId: string;
    used: boolean;
    createdAt: Date;
}

const TelegramLinkTokenSchema = new Schema<TelegramLinkTokenDoc>({
    token: { type: String, required: true, unique: true, index: true },
    userEmail: { type: String, required: true },
    historyId: { type: String, required: true },
    used: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now, expires: 60 * 30 }, // auto-delete after 30 mins
});

export default mongoose.models.TelegramLinkToken ||
    mongoose.model<TelegramLinkTokenDoc>("TelegramLinkToken", TelegramLinkTokenSchema);
