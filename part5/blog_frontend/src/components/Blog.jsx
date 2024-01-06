import { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};
const Blog = ({ blog, onUpdate, onRemove }) => {
  const [areDetailsHidden, setAreDetailsHidden] = useState(true);
  const [isAvaibleToDelete, setIsAvailableToDelete] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isAvaibleToDelete = blog.user.username === user.username;
    setIsAvailableToDelete(isAvaibleToDelete);
  }, [blog.user.username]);
  const handleLike = () => {
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
    };
    onUpdate(blogToUpdate);
  };
  const handleRemove = () => {
    onRemove(blog);
  };
  return (
    <div style={blogStyle}>
      <p>
        {blog.title} by {blog.author}
        <button onClick={() => setAreDetailsHidden(!areDetailsHidden)}>
          {areDetailsHidden ? "view" : "hide"}
        </button>
      </p>
      {!areDetailsHidden && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user.name}</p>
          {isAvaibleToDelete && <button onClick={handleRemove}>remove</button>}
        </div>
      )}
    </div>
  );
};
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
export default Blog;
