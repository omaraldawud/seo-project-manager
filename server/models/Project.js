// server/models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ["Planned", "Active", "Completed", "On Hold"],
      default: "Not Started",
    },

    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client", // we'll define this in the next step
      required: true,
    },
    startDate: Date,
    dueDate: Date,
    tags: [String],
    assignedTo: String,
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
