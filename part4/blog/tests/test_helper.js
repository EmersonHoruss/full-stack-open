const Blog = require('../models/Blog');

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
  {
    title: 'The myth of sisyphus',
    author: 'Albert Camus',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
  },
];
const aBlog = {
  title: 'Ask for the Word',
  author: 'García Perez, Alan',
  url: 'https://www.crisol.com.pe/libro-pida-palabra-9786123195304',
  likes: 30,
};
const nonExistingId = async () => {
  const blog = new Blog({});
  await blog.save();
  await blog.deleteOne();
  return blog._id.toString();
};
const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((note) => note.toJSON());
};
module.exports = {
  initialBlogs,
  aBlog,
  nonExistingId,
  blogsInDb,
};
