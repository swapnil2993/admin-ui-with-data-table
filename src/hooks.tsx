import { useCallback, useEffect, useMemo, useReducer } from "react";
import { Action, State, User } from "./types";

const USERS_API_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const initialState: State = {
  users: [],
  isLoading: false,
  error: null,
  searchQuery: "",
  currentPage: 1,
  itemsPerPage: 10,
  selectedUserIds: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "FETCH_USERS_SUCCESS":
      return { ...state, isLoading: false, users: action.payload };
    case "FETCH_USERS_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload, currentPage: 1 };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "DELETE_USERS_BY_IDS":
      return {
        ...state,
        users: state.users.filter((user) => !action.payload.includes(user.id)),
        selectedUserIds: [],
      };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case "SET_SELECTED_USER_IDS":
      return { ...state, selectedUserIds: action.payload };
    default:
      return state;
  }
};

const useUsersData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    users,
    isLoading,
    error,
    searchQuery,
    currentPage,
    itemsPerPage,
    selectedUserIds,
  } = state;

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: "FETCH_USERS_REQUEST" });
      try {
        const response = await fetch(USERS_API_URL);
        if (!response.ok) throw new Error("Failed to fetch users data");

        const data: User[] = await response.json();
        dispatch({ type: "FETCH_USERS_SUCCESS", payload: data });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        dispatch({ type: "FETCH_USERS_FAILURE", payload: err });
      }
    };

    fetchUsers();
  }, []);

  const deleteUserByIds = useCallback((ids: string[]) => {
    dispatch({ type: "DELETE_USERS_BY_IDS", payload: ids });
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    dispatch({ type: "UPDATE_USER", payload: updatedUser });
  }, []);

  const handleBulkDelete = useCallback(() => {
    deleteUserByIds(selectedUserIds);
  }, [deleteUserByIds, selectedUserIds]);

  const handleSetSelectedIds = useCallback((ids: string[]) => {
    dispatch({
      type: "SET_SELECTED_USER_IDS",
      payload: Array.from(new Set(ids)),
    });
  }, []);

  const handleSearchQueryChange = useCallback((query: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
  }, []);

  const paginate = useCallback((pageNumber: number) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: pageNumber });
  }, []);

  const filteredUserList = useMemo(() => {
    if (!searchQuery) return users;

    const lowercasedQuery = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercasedQuery) ||
        user.email.toLowerCase().includes(lowercasedQuery) ||
        user.role.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery, users]);

  const currentPageUsers = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredUserList.slice(startIdx, startIdx + itemsPerPage);
  }, [currentPage, itemsPerPage, filteredUserList]);

  const totalPages = useMemo(
    () => Math.ceil(filteredUserList.length / itemsPerPage),
    [filteredUserList.length, itemsPerPage]
  );

  if (totalPages > 0 && currentPage > totalPages) {
    paginate(1);
  }

  return {
    users: currentPageUsers,
    isLoading,
    error,
    searchQuery,
    setSearchQuery: handleSearchQueryChange,
    currentPage,
    paginate,
    itemsPerPage,
    totalPages,
    selectedUserIds,
    deleteUserByIds,
    handleBulkDelete,
    handleSetSelectedIds,
    updateUser,
  };
};

export default useUsersData;
