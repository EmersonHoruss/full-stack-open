import GeneralHelper from "../../src/GeneralHelper";
import BlogHelper from "../../src/components/BlogHelper";

describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.request("POST", `${Cypress.env("BACKEND")}/users/`, GeneralHelper.user);
    cy.visit("");
  });
  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("login");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      const { name } = GeneralHelper.user;
      cy.login(GeneralHelper.user);
      cy.contains(`${name} logged in`);
    });
    it("fails with wrong credentials", function () {
      const { username, password, name } = GeneralHelper.wronUser;
      cy.get("#username").type(username);
      cy.get("#password").type(password);
      cy.get("#login").click();
      cy.contains("invalid username or password");
      cy.get("html").should("not.contain", `${name} logged in`);
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.login(GeneralHelper.user);
    });
    it.only("A blog can be created", function () {
      const { title, author } = BlogHelper.blog;
      cy.createBlog(BlogHelper.blog);
      cy.contains(`${title} by ${author}`);
    });
    it("User can like a blog", function () {});
  });
});
