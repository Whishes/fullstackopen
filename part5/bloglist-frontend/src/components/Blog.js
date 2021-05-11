import React, { useState } from "react";

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addLike = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    });
  };

  const handleRemove = () => {
    if (window.confirm(`Remove ${blog.title}?`)) removeBlog(blog);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!visible) {
    return (
      <div style={blogStyle}>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>View</button>
      </div>
    );
  }

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}
      <button onClick={toggleVisibility}>Hide</button>
      <div>
        <p>Url: {blog.url}</p>
        <p>
          Likes: {blog.likes}
          <button onClick={addLike}>Like</button>
        </p>
        <p>User: {blog.user.name}</p>
      </div>
      <button onClick={handleRemove}>Delete</button>
    </div>
  );
};

export default Blog;
