import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: {
      type: String,
      enum: [
        "On-Page",
        "Off-Page",
        "Keyword",
        "Content",
        "Backlink",
        "Technical",
      ],
      default: "On-Page",
    },
    priority: { type: String, enum: ["High", "Medium", "Low"], default: "Low" },
    completed: { type: Boolean, default: false },
    assignedTo: String,
    tags: [String],
    startDate: Date,
    dueDate: Date,
    completedAt: Date,

    // 🔗 Relationships
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
