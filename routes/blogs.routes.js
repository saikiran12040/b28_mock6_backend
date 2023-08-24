const { Router } = require("express");
const { blogsModel } = require("../model/blogs.model");
const blogs = Router();

blogs.post("/", async (req, res) => {
  const obj = req.body;

  try {
    const newBlogPost = new blogsModel({ ...obj });
    await newBlogPost.save();
    res.status(201).send({ msg: "New Blog has been added successfully" });
  } catch (error) {
    res.status(400).send({ mesg: error.message });
  }
});

blogs.get("/", async (req, res) => {
  const { filter, sort, search, page, limit } = req.query;

  const newPage = page || 1;
  let newLimit = limit || 5;
  const newSkip = (newPage - 1) * newLimit;
  const query = {};
  const sorting = {};

  if (filter) {
    query.category = filter;
  }
  if (sort) {
    if (sort === "asc") {
      sorting.date = 1;
    } else if (sort === "desc") {
      sorting.date = -1;
    }
  }
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  try {
    const data = await blogsModel
      .find(query)
      .sort(sorting)
      .skip(newSkip)
      .limit(newLimit);
    const count = await blogsModel.countDocuments(query);
    res.status(200).send({
      data,
      currentPage: parseInt(newPage),
      totalPages: Math.ceil(count / newLimit),
    });
  } catch (error) {
    res.status(400).send({ mesg: error.message });
  }
});

blogs.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  try {
    const data = await blogsModel.findByIdAndUpdate(id, obj);
    res.status(204).send({ mesg: "updated blogs detail successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
blogs.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await blogsModel.findByIdAndDelete(id);
    res.status(202).send({ mesg: "blog deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
module.exports = { blogs };