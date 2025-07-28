import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find()
    .populate("projectId", "name")
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(500).json({ error: err.message }));
};

export const createTask = async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  // ✅ Log activity
  await logActivity({
    text: `New Task "${task.name}" added.`,
    entityType: "task",
    entityId: task._id,
  });
  res.status(201).json(newTask);
};

export const updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};

// controller/tasksController.js
export const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updated = await Task.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task status" });
  }
};
