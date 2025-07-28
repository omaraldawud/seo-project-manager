import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    title: { type: String, required: true },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    keywords: [{ type: String }],
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },

    h1: { type: String },
    h2s: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Page", pageSchema);
