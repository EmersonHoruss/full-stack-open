import UserHelper from "../../src/UserHelper";
import BlogHelper from "../../src/components/BlogHelper";

describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.request("POST", `${Cypress.env("BACKEND")}/users/`, UserHelper.user);
    cy.visit("");
  });
  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("login");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      const { name } = UserHelper.user;
      cy.login(UserHelper.user);
      cy.contains(`${name} logged in`);
    });
    it("fails with wrong credentials", function () {
      const { username, password, name } = UserHelper.wronUser;
      cy.get("#username").type(username);
      cy.get("#password").type(password);
      cy.get("#login").click();
      cy.contains("invalid username or password");
      cy.get("html").should("not.contain", `${name} logged in`);
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.login(UserHelper.user);
    });
    it("A blog can be created", function () {
      const { title, author } = BlogHelper.blogOfFirstUser;
      cy.createBlog(BlogHelper.blogOfFirstUser);
      cy.contains(`${title} by ${author}`);
    });
    it("User can like a blog", function () {
      cy.createBlog(BlogHelper.blogOfFirstUser);
      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains(`likes ${BlogHelper.blogOfFirstUser.likes + 1}`);
    });
    it("User can delete because he created", function () {
      const { title, author } = BlogHelper.blogOfFirstUser;
      cy.createBlog(BlogHelper.blogOfFirstUser);
      cy.contains("view").click();
      cy.contains("remove").click();
      cy.get("html").should("not.contain", `${title} by ${author}`);
    });
    it("User cannot delete because he did not create, button remove does not appear", function () {
      cy.createBlog(BlogHelper.blogOfFirstUser);
      cy.contains("logout").click();
      cy.request(
        "POST",
        `${Cypress.env("BACKEND")}/users/`,
        UserHelper.secondUser
      );
      cy.login(UserHelper.secondUser);
      cy.contains(
        `${BlogHelper.blogOfFirstUser.title} by ${BlogHelper.blogOfFirstUser.author}`
      )
        .contains("view")
        .click()
        .contains("remove")
        .should("not.exist");
    });
    it.only("Blogs should be ordered by higher amount of likes", function () {
      const { blogFirst, blogSecond, blogThird, blogFourth } = BlogHelper;
      cy.createBlog(blogFourth);
      cy.createBlog(blogFirst);
      cy.createBlog(blogSecond);
      cy.createBlog(blogThird);
      cy.get("#blogs")
        .children()
        .eq(0)
        .contains(`${blogFourth.title} by ${blogFourth.author}`);
      cy.get("#blogs")
        .children()
        .eq(3)
        .contains(`${blogFirst.title} by ${blogFirst.author}`);
    });
  });
});
