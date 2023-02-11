import { useState } from "react";
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { changeNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 2,
    marginBottom: 5,
  };
  const [visible, setVisible] = useState(false);
  const updateBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user.id,
    id: blog.id,
  };

  const handleView = () => {
    setVisible(!visible);
  };

  const handleLikes = () => {
    try {
      dispatch(likeBlog(blog.id, updateBlog));
      dispatch(changeNotification(`Successfully liked ${updateBlog.title}`));
    } catch (error) {
      dispatch(changeNotification(error.message));
    }
  };

  const handleDelete = () => {
    try {
      dispatch(removeBlog(blog.id));
      changeNotification("Successfully Deleted");
    } catch (error) {
      dispatch(changeNotification(error.message));
    }
  };

  const viewDetails = () => {
    return (
      <div id="viewDetails">
        {blog.url}
        <br />
        <span>likes: {blog.likes}</span> {"   "}{" "}
        <button className="handleLikes" onClick={handleLikes}>
          Like
        </button>
        <br />
        {blog.user.name}
        <br />
        {blog.user.username === user.username ? (
          <button className="removeButton" onClick={handleDelete}>
            remove
          </button>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <div style={blogStyle} className="defaultDetails">
      {blog.title} {blog.author} {"   "}
      <button onClick={handleView}>{visible ? "Hide" : "View"}</button>
      {visible && viewDetails()}
    </div>
  );
};

export default Blog;
