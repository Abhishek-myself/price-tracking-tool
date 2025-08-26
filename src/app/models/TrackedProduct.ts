import mongoose from "mongoose";

const TrackedProductSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    url: { type: String, required: true },
    name: String,
    currentPrice: String,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.TrackedProduct ||
    mongoose.model("TrackedProduct", TrackedProductSchema);
