import React from 'react'

const BlogForm = ({addBlog, title, setTitle, author, setAuthor, url, setUrl}) => {
    return (
         <form onSubmit={addBlog}>
        <div>
          Title: <input name="Title" type="title"
            value={title}
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          Author: <input name="Author" type="author"
          value={author}
          onChange={({target}) => setAuthor(target.value)}
        />
        </div>
        <div>
          Url: <input name="Url" type="url"
          value={url}
          onChange={({target}) => setUrl(target.value)}
        />
        </div>
        
        <button type="submit">Submit Blog</button>
    </form>  
    )
}

export default BlogForm
