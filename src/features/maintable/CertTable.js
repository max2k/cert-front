import { useLoaderData, useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { getTable } from '../../services/apiCertTable';
import TableRow from './TableRow';
import PageSizeSelector from './PageSizeSelector';

import FirstRowCell, { firstRowStyle } from './FirstRowCell';

function CertTable() {
  const { content, number, totalPages } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  function handlePageChange(e) {
    const paramsObj = Object.fromEntries(searchParams);
    setSearchParams({ ...paramsObj, page: e.selected });
  }

  return (
    <>
      <div className="grid grid-cols-[1fr_1fr_2fr_2fr_1fr_2fr]  divide-x-2 divide-y-2 border-4">
        <FirstRowCell title="DateTime" fieldName="createDate" />
        <FirstRowCell title="Title" fieldName="name" />
        <div className={firstRowStyle}>Tags</div>
        <FirstRowCell title="Description" fieldName="description" />
        <FirstRowCell title="Price" fieldName="price" addStyle="text-center" />

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
        <PageSizeSelector totalPages={totalPages} />
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
