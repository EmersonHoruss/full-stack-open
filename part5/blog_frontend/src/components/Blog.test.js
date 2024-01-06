import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import "jest-localstorage-mock";
import GeneralHelper from "../GeneralHelper";
import BlogHelper from "./BlogHelper";
import userEvent from "@testing-library/user-event";

describe("Blog Test", () => {
  const { blog } = BlogHelper;
  const handleUpdate = jest.fn();
  const handleRemove = jest.fn();
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("user", JSON.stringify(GeneralHelper.user));
    render(
      <Blog blog={blog} onUpdate={handleUpdate} onRemove={handleRemove} />
    );
  });
  afterEach(() => {
    localStorage.clear();
  });
  test("should display blog's title and author by default but other attribute should be hidden", () => {
    const element = screen.getByText(`${blog.title} by ${blog.author}`);
    expect(element).toBeDefined();
  });
  test("when clicked on view button blog's url and number of likes are shown", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);
    screen.getByText(`${blog.url}`);
    screen.getByText(`likes ${blog.likes}`);
  });
});
