import Page from "../models/Page.js";

// GET all pages
// GET all pages with project and client info
export const getPages = async (req, res) => {
  try {
    const pages = await Page.find().populate({
      path: "projectId",
      select: "name clientId",
      populate: { path: "clientId", select: "name" },
    });

    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pages" });
  }
};

// GET a single page
export const getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).json({ error: "Page not found" });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: "Error fetching page" });
  }
};

// POST create new page
export const createPage = async (req, res) => {
  try {
    const page = new Page(req.body);
    await page.save();
    res.status(201).json(page);
  } catch (err) {
    res.status(400).json({ error: "Failed to create page" });
  }
};

// PUT update existing page
export const updatePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!page) return res.status(404).json({ error: "Page not found" });
    res.json(page);
  } catch (err) {
    res.status(400).json({ error: "Failed to update page" });
  }
};

// DELETE page
export const deletePage = async (req, res) => {
  try {
    const result = await Page.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: "Page not found" });
    res.json({ message: "Page deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete page" });
  }
};
