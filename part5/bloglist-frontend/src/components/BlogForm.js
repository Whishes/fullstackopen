import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    //console.log(blogObject)
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        Title:{" "}
        <input
          name="Title"
          type="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:{" "}
        <input
          name="Author"
          type="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url:{" "}
        <input
          name="Url"
          type="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button type="submit">Submit Blog</button>
    </form>
  );
};

export default BlogForm;
