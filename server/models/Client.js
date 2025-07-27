import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Person or contact name
    company: { type: String }, // Company name
    email: { type: String }, // Email address
    phone: { type: String }, // Phone number
    website: { type: String }, // Company website
    industry: { type: String },
    notes: { type: String }, // Internal notes
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Client", clientSchema);
