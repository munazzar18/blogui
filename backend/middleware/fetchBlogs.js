const Blogs = require('../models/Blogs');

const fetchBlogs = async (req, res, next) => {
  try {
    const blog = await Blogs.findById(req.params.blogId);
    if (!blog) {
      return res.status(400).json({ message: "Invalid blog id" });
    }
    req.blogId = blog.id;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server Error");
  }
};

module.exports = fetchBlogs;

