// server/models/Design.js
import mongoose from "mongoose";

const designSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional for system templates
    title: { type: String, required: true },
    jsonData: { type: Object, required: true },
    thumbnailUrl: { type: String },
    category: { type: String },        // e.g., instagram, linkedin, certificate
    isBuiltIn: { type: Boolean, default: false }, // true = system template
    tags: [String],                    // optional tags for search
  },
  { timestamps: true }
);

const Design = mongoose.model("Design", designSchema);
export default Design;
