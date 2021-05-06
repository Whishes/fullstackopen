const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  return response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }
  const user = request.user;

  if (!body.likes || !body.title) {
    response.status(400).send({ error: "Likes or title property is missing" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  };

  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.status(200).json(updateBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }

  const blog = await Blog.findById(request.params.id);
  const user = request.user;

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findOneAndRemove(request.params.id);
    response.status(204).end();
  } else {
    return response.status(401).json({
      error: "invalid user",
    });
  }
});

module.exports = blogsRouter;
