// app/models/Search.ts
// import mongoose, { Schema, Document } from "mongoose";

// export interface History extends Document {
//     userEmail: string;
//     productName: string;
//     price: string;
//     url: string;
//     createdAt: Date;
// }

// const HistorySchema = new Schema<History>({
//     userEmail: { type: String, required: true },
//     productName: { type: String, required: true },
//     price: { type: String, required: true },
//     url: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.models.History ||
//     mongoose.model<History>("History", HistorySchema);


// import mongoose, { Schema, Document } from "mongoose";

// export interface History extends Document {
//     userEmail: string;
//     productName: string;
//     price: string;
//     url: string;
//     createdAt: Date;
//     tracking: boolean; // New field
// }

// const HistorySchema = new Schema<History>({
//     userEmail: { type: String, required: true },
//     productName: { type: String, required: true },
//     price: { type: String, required: true },
//     url: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     tracking: { type: Boolean, default: false }, // Default: tracking is ON
// });

// export default mongoose.models.History ||
//     mongoose.model<History>("History", HistorySchema);


import mongoose, { Schema, Document } from "mongoose";

export interface History extends Document {
    userEmail: string;
    productName: string;
    price: string;
    url: string;
    createdAt: Date;
    tracking: boolean;
    lastNotifiedPrice?: string;
    slackNotify?: boolean;
    emailNotify?: boolean;
    // telegramChatId?: string
    telegramNotify?: boolean;

}

const HistorySchema = new Schema<History>({
    userEmail: { type: String, required: true },
    productName: { type: String, required: true },
    price: { type: String, required: true },
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    tracking: { type: Boolean, default: false },
    lastNotifiedPrice: { type: String, default: null },
    slackNotify: { type: Boolean, default: false }, // NEW
    emailNotify: { type: Boolean, default: false },
    telegramNotify: { type: Boolean, default: false },
    // telegramChatId: { type: String, default: null },

});

export default mongoose.models.History ||
    mongoose.model<History>("History", HistorySchema);
