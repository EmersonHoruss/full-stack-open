import React from "react";
import { useState } from "react";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};
const Blog = ({ blog, onUpdate }) => {
  const [areDetailsHidden, setAreDetailsHidden] = useState(true);
  const handleLike = () => {
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
    };
    onUpdate(blogToUpdate);
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
        </div>
      )}
    </div>
  );
};

export default Blog;
