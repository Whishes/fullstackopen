import React from "react"

const User = ({ userBlogs }) => {
  if (!userBlogs[0]) {
    return <h1>Not returning anything</h1>
  }

  return (
    <div>
      <h1>{userBlogs[0].user.name}</h1>
      <h4>Added Blogs:</h4>
      <ul>
        {userBlogs.map((userBlog) => (
          <li key={userBlog.id}>{userBlog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
