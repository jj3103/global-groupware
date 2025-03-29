const Pagination = ({ page, totalPages, setPage }) => {
    return (
        <div className="flex justify-center mt-4">
            <button
                className={`px-3 py-1 border rounded ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
            >
                Prev
            </button>
            <span className="px-4">{page} / {totalPages}</span>
            <button
                className={`px-3 py-1 border rounded ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
