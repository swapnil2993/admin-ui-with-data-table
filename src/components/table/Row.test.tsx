import { fireEvent, render, screen } from "@testing-library/react";
import { Role, User } from "../../types";
import Row, { EmptyRow } from "./Row";

const user: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  role: "admin" as Role,
};

describe("Row", () => {
  let handleDelete: jest.Mock;
  let handleSelect: jest.Mock;
  let updateUser: jest.Mock;

  beforeEach(() => {
    handleDelete = jest.fn();
    handleSelect = jest.fn();
    updateUser = jest.fn();
  });

  it("renders correctly", () => {
    render(
      <table>
        <tbody>
          <Row
            user={user}
            handleDelete={handleDelete}
            handleSelect={handleSelect}
            isSelected={false}
            updateUser={updateUser}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("admin")).toBeInTheDocument();
  });

  it("calls handleSelect when checkbox is clicked", () => {
    render(
      <table>
        <tbody>
          <Row
            user={user}
            handleDelete={handleDelete}
            handleSelect={handleSelect}
            isSelected={false}
            updateUser={updateUser}
          />
        </tbody>
      </table>
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(handleSelect).toHaveBeenCalledWith(user.id, true);
  });

  it("enters edit mode and saves changes", () => {
    render(
      <table>
        <tbody>
          <Row
            user={user}
            handleDelete={handleDelete}
            handleSelect={handleSelect}
            isSelected={false}
            updateUser={updateUser}
          />
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    const nameInput = screen.getByRole("textbox", { name: /name/i });

    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(updateUser).toHaveBeenCalledWith({ ...user, name: "Jane Doe" });
  });

  it("calls handleDelete when delete button is clicked", () => {
    render(
      <table>
        <tbody>
          <Row
            user={user}
            handleDelete={handleDelete}
            handleSelect={handleSelect}
            isSelected={false}
            updateUser={updateUser}
          />
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(handleDelete).toHaveBeenCalledWith([user.id]);
  });
});

describe("EmptyRow Component", () => {
  it("renders correctly", () => {
    render(
      <table>
        <tbody>
          <EmptyRow />
        </tbody>
      </table>
    );

    expect(screen.getByText("No related data found")).toBeInTheDocument();
  });
});
