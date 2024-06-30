import { act, renderHook, waitFor } from "@testing-library/react";
import useUsersData from "./hooks";

const mockUsers = [
  { id: "1", name: "Alice", email: "email@email.com", role: "Admin" },
  { id: "2", name: "Bob2", email: "Bob2@email.com", role: "Member" },
  { id: "3", name: "Bob3", email: "Bob3@email.com", role: "Member" },
  { id: "4", name: "Bob4", email: "Bob4@email.com", role: "Member" },
  { id: "5", name: "Bob5", email: "Bob5@email.com", role: "Admin" },
  { id: "6", name: "Bob6", email: "Bob6@email.com", role: "Member" },
  { id: "7", name: "Bob7", email: "Bob6@email.com", role: "Admin" },
  { id: "8", name: "Bob8", email: "Bob8@email.com", role: "Member" },
  { id: "9", name: "Bob9", email: "Bob9@email.com", role: "Member" },
  { id: "10", name: "Bob10", email: "Bob10@email.com", role: "Member" },
  { id: "11", name: "Bob11", email: "Bob11@email.com", role: "Member" },
];

describe("useUsersData", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: async () => mockUsers,
      ok: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should fetch users on mount", async () => {
    const { result } = renderHook(() => useUsersData());
    await waitFor(() => !result.current.isLoading);
    expect(result.current.users).toHaveLength(10);
  });

  it("should update search query and filter users", async () => {
    const { result } = renderHook(() => useUsersData());
    act(() => {
      result.current.setSearchQuery("Alice");
    });

    await waitFor(() => result.current.users.length === 1);
    expect(result.current.users).toHaveLength(1);
  });

  it("should update current page and paginate users", async () => {
    const { result } = renderHook(() => useUsersData());
    act(() => {
      result.current.paginate(2);
    });
    await waitFor(() => result.current.currentPage === 2);
    expect(result.current.currentPage).toBe(2);
    expect(result.current.users).toHaveLength(1);
  });

  it("should delete users by ids", async () => {
    const { result } = renderHook(() => useUsersData());
    await waitFor(() => !result.current.isLoading);
    act(() => {
      result.current.deleteUserByIds(["1", "2"]);
    });
    expect(result.current.users).toHaveLength(9);
  });

  it("should update a user", async () => {
    const { result } = renderHook(() => useUsersData());
    const updatedUser = {
      id: "1",
      name: "New Name",
      email: "new@email.com",
      role: "Admin",
    };
    await waitFor(() => !result.current.isLoading);
    act(() => {
      result.current.updateUser(updatedUser);
    });
    expect(result.current.users[0].name).toEqual(updatedUser.name);
  });
});
