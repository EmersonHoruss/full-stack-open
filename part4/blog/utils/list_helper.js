const _ = require('lodash');

const dummy = () => 1;
const totalLikes = (blogs) =>
  blogs && blogs.length ? blogs.map((blog) => blog.likes).reduce((sum, item) => sum + item) : 0;
const mostBlogs = (blogs) => _.maxBy(blogs, 'likes');
module.exports = {
  dummy,
  totalLikes,
  mostBlogs,
};
