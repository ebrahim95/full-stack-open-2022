import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import "./index.css";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { changeNotification } from "./reducers/notificationReducer";
import { addBlog, initialBlogs } from "./reducers/blogReducer";
import { setUser, storeUser } from "./reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initialBlogs());
  }, []);

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn");
    if (loggedIn) {
      dispatch(storeUser(JSON.parse(loggedIn)));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(changeNotification(null));
    }, 5000);
  }, [notification]);

  const handleNotification = (message) => {
    dispatch(changeNotification(message));
  };

  const handleLogin = (event) => {
    event.preventDefault();

    try {
      dispatch(setUser(username, password));
      setUsername("");
      setPassword("");
    } catch (exception) {
      handleNotification("Wrong Credentials");
    }
  };

  const blogFormRef = useRef();

  const handleAddBlog = (blogObject) => {
    try {
      dispatch(addBlog(blogObject));
      blogFormRef.current.toggleVisibility();
      handleNotification(
        `Successfully a new Blog ${blogObject.title} by ${blogObject.author}`
      );
    } catch (error) {
      handleNotification("Wrong Object");
    }
  };

  const logOut = () => {
    window.localStorage.removeItem("loggedIn");
    dispatch(storeUser(null));
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
          .map((blog) => <Blog key={blog.id} blog={blog} />)
          .sort((a, b) => {
            return b.props.blog.likes - a.props.blog.likes;
          })}
      </div>
      <h2>create new</h2>
      <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
        <BlogForm handleForm={handleAddBlog} />
      </Togglable>
    </div>
  );
};

export default App;
