const Blog = require('../../models/Blog');
const { alanUser, albertUser } = require('./users_helper');

const mythBlog = {
  title: 'The myth of sisyphus',
  author: 'Albert Camus',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 3,
  userId: null,
};
const goToStatementConsideredHarmful = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  userId: null,
};
const goToStatementConsideredHarmful2 = {
  title: 'Go To Statement Considered Harmful 2',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  userId: null,
};
const chavin = {
  title: 'Chavín',
  author: 'Julio C Tello',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 2,
  userId: null,
};
const mythBlogWithUser = {
  ...mythBlog,
  username: albertUser.username,
};
const goToStatementConsideredHarmfulWithUser = {
  ...goToStatementConsideredHarmful,
  username: albertUser.username,
};
const goToStatementConsideredHarmfulWithUser2 = {
  ...goToStatementConsideredHarmful2,
  username: albertUser.username,
};
const chavinWithUser = {
  ...chavin,
  username: alanUser.username,
};
const initialBlogs = [
  goToStatementConsideredHarmful,
  goToStatementConsideredHarmful2,
  chavin,
  mythBlog,
];
const initialBlogsWithUsername = [
  mythBlogWithUser,
  goToStatementConsideredHarmfulWithUser,
  goToStatementConsideredHarmfulWithUser2,
  chavinWithUser,
];
const unsavedBlog = {
  title: 'Ask for the Word',
  author: 'García Perez, Alan',
  url: 'https://www.crisol.com.pe/libro-pida-palabra-9786123195304',
  likes: 30,
  userId: null,
};
const nonExistingId = async () => {
  const blog = new Blog(unsavedBlog);
  await blog.save();
  await blog.deleteOne();
  return blog._id.toString();
};
const blogsInDb = async () => {
  const blogs = await Blog.find({}).populate('userId');
  return blogs.map((note) => note.toJSON());
};
const aBlogInDb = async (title) => {
  const blogs = await Blog.find({ title }).populate('userId');
  return blogs.map((note) => note.toJSON())[0];
};
const getUsernameOfABlog = (title) => {
  return initialBlogsWithUsername.find((blog) => blog.title === title).username;
};
module.exports = {
  mythBlog,
  goToStatementConsideredHarmful,
  goToStatementConsideredHarmful2,
  chavin,
  initialBlogs,
  unsavedBlog,
  nonExistingId,
  blogsInDb,
  aBlogInDb,
  getUsernameOfABlog,
};
