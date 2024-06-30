import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import mockUsersData from "./__mocks__/mockData";
import useUsersData from "./hooks";
import { User } from "./types";

jest.mock("./hooks", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseUsersData = useUsersData as jest.MockedFunction<
  typeof useUsersData
>;

const mockData = {
  users: [...mockUsersData] as User[],
  isLoading: false,
  error: null,
  itemsPerPage: 10,
  searchQuery: "",
  setSearchQuery: jest.fn(),
  paginate: jest.fn(),
  selectedUserIds: [],
  totalPages: 1,
  currentPage: 1,
  deleteUserByIds: jest.fn(),
  handleSetSelectedIds: jest.fn(),
  handleBulkDelete: jest.fn(),
  updateUser: jest.fn(),
} as ReturnType<typeof useUsersData>;

describe("App", () => {
  beforeEach(() => {
    mockUseUsersData.mockReturnValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders header and main components", () => {
    render(<App />);
    expect(screen.getByText(/Admin ui/i)).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders search,table and pagination components", () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
    expect(screen.getByText(/Swapnil/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
  });

  it("shows loader when isLoading is true", () => {
    mockUseUsersData.mockReturnValue({
      ...mockData,

      isLoading: true,
    });
    render(<App />);
    expect(screen.getByAltText(/Loader/i)).toBeInTheDocument();
  });

  it("shows error message when error occurs", () => {
    mockUseUsersData.mockReturnValue({
      ...mockData,
      error: { message: "Failed to fetch data" } as Error,
    });
    render(<App />);
    expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument();
  });

  it("handles search input change", () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(searchInput, { target: { value: "Jane" } });
    expect(mockData.setSearchQuery).toHaveBeenCalledWith("Jane");
  });

  it("handles delete button click", () => {
    mockUseUsersData.mockReturnValue({
      ...mockData,
      selectedUserIds: ["1"],
    });
    render(<App />);
    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteButton);
    expect(mockData.handleBulkDelete).toHaveBeenCalled();
  });

  it("should not render pagination component if totalPages is 0", () => {
    mockUseUsersData.mockReturnValue({
      ...mockData,
      users: [],
      currentPage: 1,
      totalPages: 0,
    });
    render(<App />);
    expect(screen.getByText(/No related data found/i)).toBeInTheDocument();
  });
});
