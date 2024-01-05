import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./Notification";
import Togglable from "./Tooglable";
import BlogForm from "./BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setNotificationMessage(`${exception.response.data.error}`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };
  const handleLoginAsAlbert = async () => {
    try {
      const user = await loginService.login({
        username: "albert",
        password: "albert123",
      });
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotificationMessage("Wrong credentials");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  const handleCreate = async (blog) => {
    try {
      const { title, author } = await blogService.create(blog);
      setNotificationMessage(`a new blog added "${title}" by ${author}`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      console.log(exception);
      setNotificationMessage("Some problems happened, try again.");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
    try {
      setBlogs(await blogService.getAll());
    } catch (exception) {
      setNotificationMessage("Some problems happened, reload the page.");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      console.log(blogs);
      setBlogs(blogs);
    });
  }, []);

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
          <button type="button" onClick={handleLoginAsAlbert}>
            login as albert
          </button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      <p>
        {user.name} logged in{" "}
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <div>
        <h2>create new</h2>
        <Togglable buttonLabel="new note">
          <BlogForm createBlog={handleCreate} />
        </Togglable>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
