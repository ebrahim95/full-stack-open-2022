import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { changeNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const id = useParams().id;
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  console.log(blog);
  const updateBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user.id,
    id: blog.id,
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

  return (
    <div id="viewDetails">
      <h2>{blog.title}</h2>
      {blog.url}
      <br />
      <span>{blog.likes} likes</span>
      <br />
      Added by {blog.user.name}
      <br />
      <br />
      <button className="handleLikes" onClick={handleLikes}>
        Like
      </button>{" "}
      <br />
      {blog.user.username === user.username ? (
        <button className="removeButton" onClick={handleDelete}>
          Remove Blog
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default BlogDetails;
