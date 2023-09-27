import { useLoaderData, useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { getTable } from '../../services/apiCertTable';
import TableRow from './TableRow';
import PageSizeSelector from './PageSizeSelector';

function CertTable() {
  const { content, number, totalPages } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const firstRowStyle = 'bg-stone-300 font-semibold p-2';

  function handlePageChange(e) {
    const paramsObj = Object.fromEntries(searchParams);
    setSearchParams({ ...paramsObj, page: e.selected });
  }

  function handlePageSizeChange(e) {
    const paramsObj = Object.fromEntries(searchParams);
    setSearchParams({ ...paramsObj, size: e.target.value });
  }

  return (
    <>
      <div className="grid grid-cols-[1fr_1fr_2fr_2fr_1fr_2fr]  divide-x-2 divide-y-2 border-4">
        <div className={firstRowStyle}>DateTime</div>
        <div className={firstRowStyle}>Title</div>
        <div className={firstRowStyle}>Tags</div>
        <div className={firstRowStyle}>Decription</div>
        <div className={`${firstRowStyle} text-center`}>Price</div>
        <div className={firstRowStyle}> Actions</div>
        {content.map((row) => (
          <TableRow tableRow={row} key={row.id} />
        ))}
      </div>
      <div className="grid grid-cols-[1fr_10fr_1fr] items-center">
        <div></div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          forcePage={number}
          onPageChange={handlePageChange}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="m-4 flex items-center justify-center font-semibold"
          pageClassName="p-2 border-2  hover:bg-blue-500"
          activeClassName="bg-blue-300"
          nextClassName="p-2 border-2 hover:bg-blue-500"
          previousClassName="p-2 border-2 hover:bg-blue-500"
        />
        <PageSizeSelector onChange={handlePageSizeChange} />
      </div>
    </>
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const pageNum = url.searchParams.get('page');
  const pageSize = url.searchParams.get('size');
  const sorting = url.searchParams.get('sort');

  const table = await getTable(pageNum, pageSize, sorting);
  return table;
}

export default CertTable;
