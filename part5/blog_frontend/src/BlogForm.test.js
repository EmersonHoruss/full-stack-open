import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import "jest-localstorage-mock";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("BlogForm Test", () => {
  test("test when submit", async () => {
    const handleCreate = jest.fn();
    const user = userEvent.setup();
    const { container } = render(<BlogForm createBlog={handleCreate} />);
    const titleInput = container.querySelector("#title");
    await user.type(titleInput, "titleTest");
    const authorInput = container.querySelector("#author");
    await user.type(authorInput, "authorTest");
    const urlInput = container.querySelector("#url");
    await user.type(urlInput, "http://urlTest");
    const submit = screen.getByText("create");
    await user.click(submit);
    expect(handleCreate.mock.calls).toHaveLength(1);
    expect(handleCreate.mock.calls[0][0].title).toBe("titleTest");
    expect(handleCreate.mock.calls[0][0].author).toBe("authorTest");
    expect(handleCreate.mock.calls[0][0].url).toBe("http://urlTest");
  });
});
