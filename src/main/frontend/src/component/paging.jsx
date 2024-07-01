export function Paging({
                               postsNum,
                               postsPerPage,
                               setCurrentPage,
                               currentPage
                           }) {
    const pageList = [];
    const totalPages = Math.ceil(postsNum / postsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageList.push(i);
    }

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const goToPrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    if (totalPages === 1) {
        return null;
    }

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <button onClick={goToPrevPage} disabled={currentPage === 1}>
                {'<'}
            </button>

            {pageList.map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "active" : ""}
                >
                    {page}
                </button>
            ))}

            <button onClick={goToNextPage} disabled={currentPage === pageList.length}>
                >
            </button>
        </div>
    );
}