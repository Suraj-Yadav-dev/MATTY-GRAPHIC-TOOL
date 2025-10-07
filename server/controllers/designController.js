// server/controllers/designController.js
import Design from "../models/Design.js";

// @desc   Get all designs for user
// @route  GET /api/designs
export const getDesigns = async (req, res) => {
  const designs = await Design.find({ userId: req.user._id });
  res.json(designs);
};

// @desc   Create a new design
// @route  POST /api/designs
export const createDesign = async (req, res) => {
  const { title, jsonData, thumbnailUrl } = req.body;
  const design = await Design.create({
    userId: req.user._id,
    title,
    jsonData,
    thumbnailUrl,
  });
  res.status(201).json(design);
};

// @desc   Update a design
// @route  PUT /api/designs/:id
export const updateDesign = async (req, res) => {
  const design = await Design.findById(req.params.id);
  if (!design) return res.status(404).json({ message: "Design not found" });
  if (design.userId.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  design.title = req.body.title || design.title;
  design.jsonData = req.body.jsonData || design.jsonData;
  design.thumbnailUrl = req.body.thumbnailUrl || design.thumbnailUrl;

  const updatedDesign = await design.save();
  res.json(updatedDesign);
};

// @desc   Delete a design
// @route  DELETE /api/designs/:id
export const deleteDesign = async (req, res) => {
  const design = await Design.findById(req.params.id);
  if (!design) return res.status(404).json({ message: "Design not found" });
  if (design.userId.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  await design.remove();
  res.json({ message: "Design removed" });
};
// server/controllers/designController.js

// @desc   Get all built-in templates (for homepage)
export const getBuiltInDesigns = async (req, res) => {
  try {
    const { category, search } = req.query;

    let query = { isBuiltIn: true };

    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: "i" };

    const designs = await Design.find(query).sort({ createdAt: -1 });
    res.json(designs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch built-in designs", error: error.message });
  }
};
