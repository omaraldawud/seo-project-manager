// controllers/projectController.js
import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  const projects = await Project.find().populate("clientId", "name");
  res.json(projects);
};

export const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id).populate(
    "clientId",
    "name"
  );
  res.json(project);
};

export const createProject = async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.status(201).json(newProject);
};

export const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch {
    res.status(500).json({ message: "Failed to update project" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete project" });
  }
};
