import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react';

interface Props {
  page: number;
  total: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination: React.FC<Props> = ({
  page,
  total,
  setPage,
}) => {
  const pages = useMemo(() => [...new Array(total)].map((_, key) => key + 1), [total]);

  const onClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const goto = e.currentTarget.getAttribute('data-goto') ?? '1';

    if (!isNaN(+goto)) {
      setPage(parseInt(goto));
    } else if (goto === 'prev' && page > 1) {
      setPage((prev) => prev - 1);
    } else if (goto === 'next' && page < total) {
      setPage((prev) => prev + 1);
    }
  }, [page, total, setPage]);

  return (
    <nav className="pagination is-right" role="navigation" aria-label="pagination">
      {page > 1 && (
        <a className="pagination-previous" onClick={onClick} data-goto="prev">Previous</a>
      )}
      {page < total && (
        <a className="pagination-next" onClick={onClick} data-goto="next">Next page</a>
      )}
      <ul className="pagination-list">
        {pages.map((p) => (
          <li key={p}>
            <a
              className={`pagination-link ${p === page && 'is-current'}`}
              onClick={onClick}
              data-goto={p}
              aria-label={`Goto page ${p}`}>
                {p}
              </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
