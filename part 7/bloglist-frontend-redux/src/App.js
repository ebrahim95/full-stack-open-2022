import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import "./index.css";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { changeNotification } from "./reducers/notificationReducer";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = loginService;
  const { setToken, create, getAll, update, remove } = blogService;
  const dispatch = useDispatch()
  const notification = useSelector( state => state.notification)

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn");
    if (loggedIn) {
      const user = JSON.parse(loggedIn);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(changeNotification(null))
    }, 5000)

  }, [notification])

  const handleNotification = (message) => {
    dispatch(changeNotification(message));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await login({ username, password });
      window.localStorage.setItem("loggedIn", JSON.stringify(user));
      setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      handleNotification(`Successfully logged in ${user.name}`);
    } catch (exception) {
      handleNotification("Wrong Credentials");
    }
  };

  const blogFormRef = useRef();
  const addBlog = async (blogObject) => {
    try {
      let returnedBlog = await create(blogObject);

      blogFormRef.current.toggleVisibility();
      setBlogs([...blogs, returnedBlog]);
      handleNotification(
        `Successfully a new Blog ${returnedBlog.title} by ${returnedBlog.author}`
      );
    } catch (error) {
      handleNotification("Wrong Object");
    }
  };
  const handleLikes = async (id, blogObject) => {
    try {
      let updatedBlog = await update(id, blogObject);
      const updatedBlogList = blogs.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
      setBlogs(updatedBlogList);
      handleNotification(`Successfully liked ${updatedBlog.title}`);
    } catch (error) {
      handleNotification(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await remove(id);
      const updatedBlogList = blogs.filter((blog) => blog.id !== id);
      setBlogs(updatedBlogList);
      handleNotification("Successfully Deleted");
    } catch (error) {
      handleNotification(error.message);
    }
  };

  const logOut = () => {
    window.localStorage.removeItem("loggedIn");
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsername={({ target }) => setUsername(target.value)}
          handlePassword={({ target }) => setPassword(target.value)}
        />
        <Notification message={notification} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <p>
        {`${user.name} is logged in `}
        <button onClick={logOut}>logout</button>
      </p>
      <div className="blogs">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLikes={handleLikes}
              handleDelete={handleDelete}
              user={user}
            />
          ))}
      </div>
      <h2>create new</h2>
      <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
        <BlogForm handleForm={addBlog} />
      </Togglable>
    </div>
  );
};

export default App;
