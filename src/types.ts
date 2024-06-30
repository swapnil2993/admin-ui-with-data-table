export enum Role {
  "ADMIN" = "Admin",
  "MEMBER" = "Member",
}

export type User = {
  id: string;
  role: Role;
  name: string;
  email: string;
};

export type Action =
  | { type: "FETCH_USERS_REQUEST" }
  | { type: "FETCH_USERS_SUCCESS"; payload: User[] }
  | { type: "FETCH_USERS_FAILURE"; payload: Error }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "DELETE_USERS_BY_IDS"; payload: string[] }
  | { type: "UPDATE_USER"; payload: User }
  | { type: "SET_SELECTED_USER_IDS"; payload: string[] };

export interface State {
  users: User[];
  isLoading: boolean;
  error: Error | null;
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  selectedUserIds: string[];
}
