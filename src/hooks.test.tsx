import { act, renderHook, waitFor } from "@testing-library/react";
import mockData from "./__mocks__/mockData";
import useUsersData from "./hooks";
import { Role } from "./types";

const mockUsers = [...mockData];

describe("useUsersData", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => mockUsers,
      ok: true,
    } as Response);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should fetch users on mount", async () => {
    const { result } = renderHook(() => useUsersData());
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    expect(result.current.users).toHaveLength(10);
    expect(result.current.error).toBeNull();
    expect(result.current.searchQuery).toEqual("");
    expect(result.current.itemsPerPage).toEqual(10);
    expect(result.current.totalPages).toEqual(2);
  });

  it("should update search query and filter users", async () => {
    const { result } = renderHook(() => useUsersData());
    act(() => {
      result.current.setSearchQuery("Alice");
    });

    await waitFor(() => expect(result.current.users).toHaveLength(1));
    expect(result.current.searchQuery).toEqual("Alice");
    expect(result.current.itemsPerPage).toEqual(10);
    expect(result.current.totalPages).toEqual(1);
  });

  it("should delete users by ids", async () => {
    const { result } = renderHook(() => useUsersData());
    await waitFor(() => !result.current.isLoading);
    act(() => {
      result.current.deleteUserByIds(["1", "2"]);
    });
    expect(result.current.users).toHaveLength(9);
    expect(result.current.totalPages).toEqual(1);
  });

  it("should update a user", async () => {
    const { result } = renderHook(() => useUsersData());
    const updatedUser = {
      id: "1",
      name: "New Name",
      email: "new@email.com",
      role: "Admin" as Role,
    };
    await waitFor(() => !result.current.isLoading);
    act(() => {
      result.current.updateUser(updatedUser);
    });
    expect(result.current.users[0]).toEqual(updatedUser);
  });

  it("should update current page and paginate users", async () => {
    const { result } = renderHook(() => useUsersData());
    act(() => {
      result.current.paginate(2);
    });
    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
    expect(result.current.currentPage).toBe(2);
    expect(result.current.users).toHaveLength(1);
  });

  it("should set error on api call failure", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => mockUsers,
      ok: false,
    } as Response);
    const { result } = renderHook(() => useUsersData());
    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
    expect(result.current.error).toEqual(
      new Error("Failed to fetch users data")
    );
  });
});
