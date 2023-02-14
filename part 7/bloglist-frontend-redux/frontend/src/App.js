/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import BlogRender from "./components/Blog";
import Notification from "./components/Notification";
import "./index.css";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import { useDispatch, useSelector } from "react-redux";
import { changeNotification } from "./reducers/notificationReducer";
import { addBlog, initialBlogs } from "./reducers/blogReducer";
import { storeUser } from "./reducers/userReducer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initialUserInfo } from "./reducers/userInfoReducer";
import DisplayUser from "./components/DisplayUser";
import BlogDetails from "./components/BlogDetails";
import Navbar from "./components/Navbar";

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initialBlogs());
    dispatch(initialUserInfo());
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



  if (user === null) {
    return (
      <div>
        <LoginForm />
        <Notification message={notification} />
      </div>
    );
  }

  return (
    <Router>
      <div>
        <Navbar />
        <Notification message={notification} />
        <Togglable buttonLabel="Create New" ref={blogFormRef}>
          <BlogForm handleForm={handleAddBlog} />
        </Togglable>

        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<DisplayUser />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/" element={<BlogRender />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
