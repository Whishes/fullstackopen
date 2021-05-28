import blogService from "../services/blogs"

const reducer = (state = [], action) => {
  //console.log("state now: ", state)
  //console.log("action", action)

  switch (action.type) {
  case "ADD_LIKE": {
    return state.map((blog) =>
      blog.id === action.data.id
        ? { ...blog, likes: action.data.likes }
        : blog
    )
  }
  case "CREATE_BLOG":
    return [...state, action.data]
  case "DELETE_BLOG":
    return state.filter((blog) => blog.id !== action.data.id)
  case "INIT_BLOG":
    return action.data
  case "COMMENT_BLOG":
    return state.map((blog) =>
      blog.id === action.data.blog.id ? action.data.blog : blog
    )
  default:
    return state
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    const updateBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch({
      type: "ADD_LIKE",
      data: updateBlog,
    })
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    //console.log(`createBlog reducer: ${newBlog}`)
    dispatch({
      type: "CREATE_BLOG",
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: "INIT_BLOG",
      data: blogs,
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)

    dispatch({
      type: "DELETE_BLOG",
      data: { id },
    })
  }
}

export const addComment = (comment, id) => {
  return async (dispatch) => {
    const newCommentBlog = await blogService.addComment(comment, id)

    dispatch({
      type: "ADD_COMMENT",
      data: newCommentBlog,
    })
  }
}

export default reducer
