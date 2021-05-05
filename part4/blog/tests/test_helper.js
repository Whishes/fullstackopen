const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

const initialUsers = [
  {
    username: "nick",
    name: "nick test",
    passwordHash: "test",
  },
  {
    username: "lachy",
    name: "lachy test",
    passwordHash: "test",
  },
];

const blogsInDb = async () => {
  return await Blog.find({});
};

const usersInDb = async () => {
  return await User.find({});
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  initialUsers,
};
