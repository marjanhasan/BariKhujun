const Pagination = ({ page, setPage }) => {
  return (
    <div className="flex justify-center my-6">
      <div className="join mx-auto">
        <button
          className="join-item btn"
          onClick={() => {
            page === 1 ? setPage(1) : setPage(page - 1);
          }}
          disabled={page === 1}
        >
          «
        </button>
        <button className="join-item btn">{page}</button>
        <button
          className="join-item btn"
          onClick={() => {
            page === 10 ? setPage(10) : setPage(page + 1);
          }}
          disabled={page === 10}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
