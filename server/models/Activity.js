import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    entityType: {
      type: String,
      enum: ["client", "project", "task", "page"],
      required: true,
    },
    entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
