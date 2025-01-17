import "./search.scss";

type SearchProps = {
  query: string;
  handleSearch: (value: string) => void;
};

const Search = ({ query, handleSearch }: SearchProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      handleSearch(query);
    }
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
