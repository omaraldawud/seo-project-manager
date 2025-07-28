import express from "express";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import Client from "../models/Client.js";
import Page from "../models/Page.js";
import Activity from "../models/Activity.js";

const router = express.Router();

// GET /api/activity
router.get("/", async (req, res) => {
  try {
    // Dynamically generate recent activity from main collections
    const [tasks, projects, clients, pages, recordedActivities] =
      await Promise.all([
        Task.find().sort({ createdAt: -1 }).limit(3).lean(),
        Project.find().sort({ createdAt: -1 }).limit(3).lean(),
        Client.find().sort({ createdAt: -1 }).limit(3).lean(),
        Page.find().sort({ createdAt: -1 }).limit(3).lean(),
        Activity.find().sort({ createdAt: -1 }).limit(3).lean(), // Optional persistent logs
      ]);

    const generatedActivity = [
      ...tasks.map((item) => ({
        type: "Task",
        text: `Added task: "${item.title}"`,
        date: item.createdAt,
      })),
      ...projects.map((item) => ({
        type: "Project",
        text: `Created project: "${item.name}"`,
        date: item.createdAt,
      })),
      ...clients.map((item) => ({
        type: "Client",
        text: `Added client: "${item.name}"`,
        date: item.createdAt,
      })),
      ...pages.map((item) => ({
        type: "Page",
        text: `Created page: "${item.title}"`,
        date: item.createdAt,
      })),
    ];

    // Merge recorded and generated activities
    const allActivity = [
      ...recordedActivities.map((a) => ({
        type: a.type || "Other",
        text: a.text,
        date: a.createdAt,
      })),
      ...generatedActivity,
    ];

    // Sort by most recent and limit to top 6
    const recent = allActivity
      .filter((a) => a.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6);

    res.json(recent);
  } catch (err) {
    console.error("Activity fetch error:", err);
    res.status(500).json({ error: "Failed to fetch activity" });
  }
});

export default router;
