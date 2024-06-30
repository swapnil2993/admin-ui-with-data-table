import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "./index";

describe("Pagination", () => {
  it("renders correctly", () => {
    const paginate = jest.fn();
    const { container } = render(
      <Pagination totalPages={5} paginate={paginate} currentPage={1} />
    );
    expect(container).toMatchSnapshot();
  });

  it("calls paginate function with correct page number when button is clicked", () => {
    const paginateMock = jest.fn();
    render(
      <Pagination totalPages={5} paginate={paginateMock} currentPage={1} />
    );

    fireEvent.click(screen.getByText("2"));
    expect(paginateMock).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText(">>"));
    expect(paginateMock).toHaveBeenCalledWith(5);
  });

  it("disables buttons when for first page", () => {
    const paginateMock = jest.fn();
    render(
      <Pagination totalPages={5} paginate={paginateMock} currentPage={1} />
    );

    expect(screen.getByText("<<")).toBeDisabled();
    expect(screen.getByText("<")).toBeDisabled();
    expect(screen.getByText(">")).not.toBeDisabled();
    expect(screen.getByText(">>")).not.toBeDisabled();
  });

  it("disables buttons when appropriate for last page", () => {
    const paginateMock = jest.fn();
    render(
      <Pagination totalPages={3} paginate={paginateMock} currentPage={3} />
    );

    expect(screen.getByText("<<")).not.toBeDisabled();
    expect(screen.getByText("<")).not.toBeDisabled();
    expect(screen.getByText(">")).toBeDisabled();
    expect(screen.getByText(">>")).toBeDisabled();
  });

  it("highlights active page", () => {
    const paginateMock = jest.fn();
    render(
      <Pagination totalPages={5} paginate={paginateMock} currentPage={3} />
    );

    expect(screen.getByText("3")).toHaveClass("active");
  });
});
