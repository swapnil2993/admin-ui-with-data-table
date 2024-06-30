import "./search.scss";

const Search = ({ query, handleSearch }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(e.currentTarget.value);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.currentTarget.value);
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input
        className="input-text"
        type="search"
        defaultValue={query}
        onChange={handleOnChange}
        placeholder="Search by name, email, role..."
      />
    </form>
  );
};

export default Search;
