import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService  from './services/login'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser ] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = loginService
  const { setToken, create, getAll, update } = blogService

  useEffect(() => {
    getAll().then(blogs =>
      setBlogs( blogs )
    )  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const loggedIn = window.localStorage.getItem('loggedIn')
    if (loggedIn) {
      const user = JSON.parse(loggedIn)
      setUser(user)
      setToken(user.token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNotification = (message) => {
    setNotification(message)
    setTimeout(() => { setNotification(null) }, 5000)
  }
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login({username, password}) 
      window.localStorage.setItem('loggedIn', JSON.stringify(user))
      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      handleNotification(`Successfully logged in ${user.name}`)
      
    } catch(exception) {
      setNotification('Wrong Credentials')
      setTimeout(() => { setNotification(null) }, 5000)
    }

  }

  const blogFormRef = useRef()
  const addBlog = async (blogObject) => {
    try{
      let returnedBlog = await 
      create(blogObject)
      
      blogFormRef.current.toggleVisibility()
      setBlogs([...blogs, returnedBlog])
      handleNotification(`a new Blog ${returnedBlog.title} by ${returnedBlog.author}`)
    } catch(error) {
      handleNotification('Wrong Object')
    }
  }
  const handleLikes = async (id, blogObject) => {
    try {
      let updatedBlog = await update(id, blogObject)
      const updatedBlogList = blogs.map((blog) => blog.id !== updatedBlog.id ? blog : updatedBlog)
      setBlogs(updatedBlogList)
      handleNotification(`Blog ${updatedBlog.title} by ${updatedBlog.author} liked`)
    } catch (error) {
      handleNotification(error.message)
    }
  }

  const loginForm = () => (
    <>
      <h2>Log into Application</h2>
      <form onSubmit={handleLogin}>
        <div>username 
          <input type='text' value={username} name='Username' onChange={({target}) => setUsername(target.value)}/>
        </div> 
        <div>
          password 
          <input type='password' value={password} name='Password' onChange={({target}) => setPassword(target.value)}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )

  const logOut = () => { 
    window.localStorage.removeItem('loggedIn')
    setUser(null)
  }



  if ( user === null ) {
    return (
      <div>
       { loginForm()}
       <Notification message={notification} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <p>
        {`${user.name} is logged in `}
        <button onClick={logOut}>logout</button>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLikes={handleLikes}/>
      )}
      <h2>create new</h2>
      <Togglable buttonLabel='Add Blog' ref={blogFormRef}>
        <BlogForm handleForm={addBlog}/>
      </Togglable>
    </div>
  )
}

export default App
