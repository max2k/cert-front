import { useSearchParams } from 'react-router-dom';

const pageSizes = [5, 10, 15, 20, 25];

function PageSizeSelector({ totalPages }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageSize = searchParams.get('size');

  function handlePageSizeChange(e) {
    let paramsObj = Object.fromEntries(searchParams);
    const currPage = searchParams.get('page');
    const newPageSize = e.target.value;
    const firstElement = currPage * pageSize;

    const newPageNum = Math.floor(firstElement / newPageSize);

    paramsObj = { ...paramsObj, size: newPageSize };
    if (currPage) paramsObj = { ...paramsObj, page: newPageNum };

    setSearchParams(paramsObj);
  }

  return (
    <div className="flex justify-end">
      <select
        className="w-14 border-2 p-1"
        defaultValue={pageSize}
        onChange={handlePageSizeChange}
      >
        {pageSizes.map((size) => (
          <option value={size} key={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PageSizeSelector;
