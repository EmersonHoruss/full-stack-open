const dummy = () => 1;
const totalLikes = (blogs) =>
  blogs && blogs.length ? blogs.map((blog) => blog.likes).reduce((sum, item) => sum + item) : 0;
module.exports = {
  dummy,
  totalLikes,
};
