import mongoose from "mongoose";

const PriceHistorySchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "TrackedProduct" },
    oldPrice: String,
    newPrice: String,
    changedAt: { type: Date, default: Date.now },
});

export default mongoose.models.PriceHistory ||
    mongoose.model("PriceHistory", PriceHistorySchema);
