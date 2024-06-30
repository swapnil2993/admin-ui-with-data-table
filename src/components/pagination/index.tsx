import "./pagination.scss";

type PaginationProps = {
  totalPages: number;
  paginate: (arg: number) => void;
  currentPage: number;
};

const Pagination = ({ totalPages, paginate, currentPage }: PaginationProps) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <nav className="pagination-wrapper">
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          className="page-btn-skip"
          onClick={() => paginate(1)}
        >
          {`<<`}
        </button>

        <button
          disabled={currentPage === 1}
          className="page-btn-skip"
          onClick={() => paginate(currentPage - 1)}
        >
          {`<`}
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? "page-btn active" : "page-btn"}
          >
            {number}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          className="page-btn-skip"
          onClick={() => paginate(currentPage + 1)}
        >
          {`>`}
        </button>

        <button
          disabled={currentPage === totalPages}
          className="page-btn-skip"
          onClick={() => paginate(totalPages)}
        >
          {`>>`}
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
