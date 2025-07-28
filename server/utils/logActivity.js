import Activity from "../models/Activity.js";

export const logActivity = async ({ text, entityType, entityId }) => {
  try {
    await Activity.create({ text, entityType, entityId });
  } catch (err) {
    console.error("⚠️ Failed to log activity:", err.message);
  }
};
