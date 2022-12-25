import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService  from './services/login'
import Notification from './components/Notification'
import './index.css'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser ] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const { login } = loginService
  const { setToken, create, getAll } = blogService

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

  const addBlog = async (event) => {
    event.preventDefault()
    try{
      let returnedBlog = await 
      create({ 
        title: title,
        author: author,
        url: url,
      })

      setBlogs([...blogs, returnedBlog])
      handleNotification(`a new Blog ${title} by ${author}`)
    } catch(error) {
      handleNotification('Wrong Object')
    }
  }

  if ( user === null ) {
    return (
      <div>
       { loginForm()}
       <Notification message={notification} />
      </div>
    )
  }
  const addForm = () => (
    <>
      <form onSubmit={addBlog}>
        title{"    "}
        <input type='text' value={title} name='title' onChange={({target}) => setTitle(target.value)}/><br/>
        author{"    "}
        <input type='text' value={author} name='author' onChange={({target}) => setAuthor(target.value)}/><br/>
        url{"    "}
        <input type='text' value={url} name='url' onChange={({target}) => setUrl(target.value)}/><br/><br/>
        <button type="submit">Add Blog</button>
      </form>
    </>
  )


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <p>
        {`${user.name} is logged in `}
        <button onClick={logOut}>logout</button>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <h2>create new</h2>
      {addForm()}
    </div>
  )
}

export default App
