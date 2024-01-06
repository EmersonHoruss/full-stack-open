import UserHelper from "../UserHelper";
const blogFirst = {
  title: "titleTest",
  author: "authorTest",
  url: "http://urlTest",
  likes: 1,
};
const blogOfFirstUser = {
  ...blogFirst,
  user: UserHelper.user,
};
const blogSecond = {
  title: "titleTest2",
  author: "authorTest2",
  url: "http://urlTest2",
  likes: 2,
};
const blogThird = {
  title: "titleTest3",
  author: "authorTest3",
  url: "http://urlTest3",
  likes: 3,
};
const blogFourth = {
  title: "titleTest4",
  author: "authorTest4",
  url: "http://urlTest4",
  likes: 4,
};
const blogOfSecondUser = {
  ...blogSecond,
  user: UserHelper.secondUser,
};
const blogs = [blogFirst, blogSecond, blogThird, blogFourth];
const getHigher = (position) => {
  return blogs.sort((a, b) => b.likes - a.likes)[position];
};
const BlogHelper = {
  blogFirst,
  blogOfFirstUser: blogOfFirstUser,
  blogSecond,
  blogOfSecondUser,
  blogThird,
  blogFourth,
  getHigher,
};
export default BlogHelper;
