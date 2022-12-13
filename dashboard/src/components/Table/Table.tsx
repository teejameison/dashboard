import { useState, useMemo, Key } from 'react';
import { sortRows, filterRows, paginateRows } from 'utils';
import { Pagination } from './Pagination';

type Table = {
  columns:string[];
  rows: string[]
}

export const Table = ({ columns, rows }:Table) => {
  console.log('columns',columns);
  
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState<string[]>([]);
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' });
  const rowsPerPage = 10;

  const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters]);
  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort]
  );
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);
  

  const sortArrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ml-1 w-3 h-3"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 320 512"
    >
      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"></path>
    </svg>
  );

  const handleSearch = (value: string, title: string | number) => {
    setActivePage(1);

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [title]: value
      }));
    } else {
      setFilters((prevFilters) => {
        const updatedFilters:any = { ...prevFilters };
        delete updatedFilters[title];

        return updatedFilters;
      });
    }
  };

  const handleSort = (title: string) => {
    setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === 'asc' && prevSort.orderBy === title
          ? 'desc'
          : 'asc',
      orderBy: title
    }));
  };

  const resetAll = () => {
    setSort({ order: 'asc', orderBy: 'id' });
    setActivePage(1);
    setFilters({});
  };

  return (
    <div className='py-5'>
      <div className="overflow-x-scroll">
        <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column: string, index: Key) => {
                const sortIcon = () => {
                  return sortArrow;
                };
                return (
                  <th className="px-6 py-3 min-w-[200px]" key={index}>
                    <span>{column}</span>
                    <button onClick={() => handleSort(column)}>
                      {sortIcon()}
                    </button>
                  </th>
                );
              })}
            </tr>
            <tr>
              {columns.map((column: string, index: Key) => {
                return (
                  <th className="px-6 py-3" key={index}>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="search"
                      placeholder={`Search ${column}`}
                      value={filters[column]}
                      onChange={(event) =>
                        handleSearch(event.target.value, column)
                      }
                    />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {calculatedRows.map((row, index) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                  {columns.map((column: string, index: Key) => {
                    return (
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap" key={index}>
                        {row[column]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <>
        {count > 0 ? (
          <Pagination
            activePage={activePage}
            count={count}
            rowsPerPage={rowsPerPage}
            totalPages={totalPages}
            setActivePage={setActivePage}
          />
        ) : (
          <p>No data found</p>
        )}

        <div>
          <p>
            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={resetAll}>Reset</button>
          </p>
        </div>
      </>
    </div>
  );
};
