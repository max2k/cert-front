import { useSearchParams } from 'react-router-dom';
import SortSign from '../../ui/SortSign';
import { getNextDirection, getSortDirectonObj } from '../../utils/helpers';

export const firstRowStyle = 'bg-stone-300 font-semibold p-2';

function FirstRowCell({ title, fieldName, addStyle }) {
  const style =
    'bg-stone-300 font-semibold p-2 active:bg-stone-400 hover:bg-stone-200' +
    addStyle;

  const [searchParams, setSearchParams] = useSearchParams();

  function handleSortChange(newSortOrder) {
    console.log(newSortOrder);
    if (!newSortOrder && newSortOrder === '') {
      searchParams.delete('sort');
      setSearchParams(searchParams);
    } else {
      const paramsObj = Object.fromEntries(searchParams);
      setSearchParams({ ...paramsObj, sort: newSortOrder });
    }
  }

  const sortDirection = getSortDirectonObj(searchParams.get('sort'));

  return (
    <div
      className={style}
      onClick={() =>
        handleSortChange(getNextDirection(fieldName, sortDirection[fieldName]))
      }
    >
      {title} <SortSign direction={sortDirection[fieldName]} />
    </div>
  );
}

export default FirstRowCell;
