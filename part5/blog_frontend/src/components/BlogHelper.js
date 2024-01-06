import UserHelper from "../UserHelper";
const blog = {
  title: "titleTest",
  author: "authorTest",
  url: "http://urlTest",
  likes: 1,
  user: UserHelper.user,
};
const blogOfSecondUser = {
  title: "titleTest2",
  author: "authorTest2",
  url: "http://urlTest2",
  likes: 2,
  user: UserHelper.secondUser,
};
const BlogHelper = {
  blog,
  blogOfSecondUser,
};
export default BlogHelper;
