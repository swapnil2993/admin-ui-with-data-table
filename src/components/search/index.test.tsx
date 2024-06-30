import { fireEvent, render, screen } from "@testing-library/react";
import Search from "./index";

describe("Search", () => {
  it("should call handleSearch on form submit", () => {
    const handleSearch = jest.fn();
    render(<Search query="" handleSearch={handleSearch} />);

    const input = screen.getByPlaceholderText("Search by name, email, role...");
    fireEvent.change(input, { target: { value: "test" } });

    const form = input.closest("form");
    if (form) {
      fireEvent.submit(form);
    } else {
      throw new Error("Form element not found");
    }

    expect(handleSearch).toHaveBeenCalledWith("test");
    expect(handleSearch).toHaveBeenCalledWith("test");
  });

  it("should call handleSearch on input change", () => {
    const handleSearch = jest.fn();
    render(<Search query="" handleSearch={handleSearch} />);
    const input = screen.getByPlaceholderText("Search by name, email, role...");
    fireEvent.change(input, { target: { value: "test" } });
    expect(handleSearch).toHaveBeenCalledWith("test");
  });

  it("should not call handleSearch if input value is empty", () => {
    const handleSearch = jest.fn();
    render(<Search query="" handleSearch={handleSearch} />);
    const input: HTMLInputElement = screen.getByPlaceholderText(
      "Search by name, email, role..."
    );
    const form = input.closest("form");

    if (form) {
      fireEvent.submit(form);
    } else {
      throw new Error("Form element not found");
    }
    expect(handleSearch).not.toHaveBeenCalled();
  });
});
