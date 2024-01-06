import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import "jest-localstorage-mock";

describe("Blog Test", () => {
  beforeEach(() => {
    localStorage.clear();
    const user = {
      username: "test username",
      token: "test token",
      name: "name",
    };
    localStorage.setItem("user", JSON.stringify(user));
  });

  afterEach(() => {
    localStorage.clear();
  });
  test("should display blog's title and author by default but other attribute should be hidden", () => {
    const blog = {
      title: "test title",
      author: "test author",
      url: "http://test-blog",
      user: localStorage.getItem("user"),
    };
    const handleUpdate = jest.fn();
    const handleRemove = jest.fn();
    render(
      <Blog blog={blog} onUpdate={handleUpdate} onRemove={handleRemove} />
    );
    const element = screen.getByText(`${blog.title} by ${blog.author}`);
    expect(element).toBeDefined();
  });
});
