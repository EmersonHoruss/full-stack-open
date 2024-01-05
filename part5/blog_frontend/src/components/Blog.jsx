import React from "react";
import { useState } from "react";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};
const Blog = ({ blog }) => {
  const [areDetailsHidden, setAreDetailsHidden] = useState(true);
  const handleLike = () => {
    console.log(blog.likes);
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
