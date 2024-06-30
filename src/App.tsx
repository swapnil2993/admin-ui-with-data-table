import { TriangleAlert } from "lucide-react";
import "./app.scss";
import Header from "./components/header";
import Pagination from "./components/pagination";
import Search from "./components/search";
import Table from "./components/table";
import useUsersData from "./hooks";
import loaderUrl from "./loader.svg";

function App() {
  const {
    users,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    paginate,
    selectedUserIds,
    totalPages,
    currentPage,
    deleteUserByIds,
    handleSetSelectedIds,
    handleBulkDelete,
    updateUser,
  } = useUsersData();

  return (
    <div className="container-wrapper">
      <Header />
      <main className="container">
        {error ? (
          <div className="info-container">
            <TriangleAlert size={20} strokeWidth={1} absoluteStrokeWidth />
            {error?.message || "Something went wrong"}
          </div>
        ) : isLoading ? (
          <div className="info-container">
            <img src={loaderUrl} width={"100px"} alt={"Loader"} />
          </div>
        ) : (
          <>
            <Search query={searchQuery} handleSearch={setSearchQuery} />
            <Table
              data={users}
              handleDelete={deleteUserByIds}
              handleRowSelect={handleSetSelectedIds}
              selectedUsers={selectedUserIds}
              updateUser={updateUser}
            />
            {selectedUserIds.length ? (
              <div className="delete-container">
                <button
                  data-testid="bulk-delete"
                  className="delete-btn"
                  onClick={handleBulkDelete}
                >
                  Delete Selected
                </button>
              </div>
            ) : null}
            {totalPages > 0 && (
              <Pagination
                totalPages={totalPages}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
