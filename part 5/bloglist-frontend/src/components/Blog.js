import { useState } from 'react'

const Blog = ({ blog, handleLikes, handleDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const updateBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user.id,
    id: blog.id
  }
  const updateLikeCount = () => {
    handleLikes(blog.id, updateBlog)
  }

  const deleteBlog = () => {
    handleDelete(blog.id)
  }
  const handleView = () => {
    setVisible(!visible)
  }
  const viewDetails = () => {
    return (
      <div>
        {blog.url}<br/>
        likes: {blog.likes} {'   '} <button onClick={updateLikeCount}>like</button><br/>
        {blog.user.name}
        <br/>{ blog.user.username === user.username ? <button onClick={deleteBlog}>remove</button> : ''}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} {'   '}
      <button onClick={handleView}>{ visible ? 'Hide' : 'View'} </button>
      {visible && viewDetails()}
    </div>
  )}

export default Blog