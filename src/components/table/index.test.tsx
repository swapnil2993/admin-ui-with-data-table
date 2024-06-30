import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Role, User } from "../../types";
import Table from "./index";

describe("Table", () => {
  const users: User[] = [
    {
      id: "1",
      name: "User 1",
      email: "user1@example.com",
      role: "admin" as Role,
    },
    {
      id: "2",
      name: "User 2",
      email: "user2@example.com",
      role: "member" as Role,
    },
    {
      id: "3",
      name: "User 3",
      email: "user3@example.com",
      role: "member" as Role,
    },
  ];

  it("renders the table header", () => {
    const mockFn = jest.fn();
    render(
      <Table
        data={users}
        handleDelete={mockFn}
        handleRowSelect={mockFn}
        selectedUsers={[]}
        updateUser={mockFn}
      />
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();

    expect(screen.getAllByRole("row").length).toBe(users.length + 1);
    users.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
  });

  it("toggles all users selection", async () => {
    const mockFn = jest.fn();
    const handleRowSelectMock = jest.fn();
    const { rerender } = render(
      <Table
        data={users}
        handleDelete={mockFn}
        handleRowSelect={handleRowSelectMock}
        selectedUsers={[]}
        updateUser={mockFn}
      />
    );

    await act(async () => {
      await userEvent.click(screen.getByTestId("select-all"));
    });
    expect(handleRowSelectMock).toHaveBeenCalledWith(
      users.map((user) => user.id)
    );

    rerender(
      <Table
        data={users}
        handleDelete={mockFn}
        handleRowSelect={handleRowSelectMock}
        selectedUsers={users.map((user) => user.id)}
        updateUser={mockFn}
      />
    );

    await act(async () => {
      await userEvent.click(screen.getByTestId("select-all"));
    });

    expect(handleRowSelectMock).toHaveBeenCalledWith([]);
  });
});
