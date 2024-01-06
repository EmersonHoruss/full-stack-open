import GeneralHelper from "../../src/GeneralHelper";

describe("Blog App", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users/", GeneralHelper.user);
    cy.visit("http://localhost:5173");
  });
  it("Login form is shown", () => {
    cy.contains("Log in to application");
    cy.contains("login");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      const { username, password, name } = GeneralHelper.user;
      cy.get("#username").type(username);
      cy.get("#password").type(password);
      cy.get("#login").click();
      cy.contains(`${name} logged in`);
    });

    it("fails with wrong credentials", function () {
      const { username, password, name } = GeneralHelper.wronUser;
      cy.get("#username").type(username);
      cy.get("#password").type(password);
      cy.get("#login").click();
      cy.contains("invalid username or password")
      cy.get("html").should("not.contain", `${name} logged in`)
    });
  });
});
