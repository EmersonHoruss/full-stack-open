const Blog = require('../models/Blog');

const mythBlog = {
  title: 'The myth of sisyphus',
  author: 'Albert Camus',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 3,
};
const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Go To Statement Considered Harmful 2',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Chavín',
    author: 'Julio C Tello',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
  },
  mythBlog,
];
const unsavedBlog = {
  title: 'Ask for the Word',
  author: 'García Perez, Alan',
  url: 'https://www.crisol.com.pe/libro-pida-palabra-9786123195304',
  likes: 30,
};
const nonExistingId = async () => {
  const blog = new Blog(unsavedBlog);
  await blog.save();
  await blog.deleteOne();
  return blog._id.toString();
};
const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((note) => note.toJSON());
};
const aBlogInDb = async () => {
  const blogs = await Blog.find({ title: mythBlog.title });
  return blogs.map((note) => note.toJSON())[0];
};
module.exports = {
  initialBlogs,
  aBlog: unsavedBlog,
  nonExistingId,
  blogsInDb,
  aBlogInDb,
  mythBlog,
};
