import { useSearchParams } from 'react-router-dom';
import Button from '../../ui/Button';
import { getSearchStrAndTags } from '../../utils/helpers';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setError, clearError } from '../error/errorSlice';

function SearchElement() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [typedString, setTypedString] = useState(searchParams.get('substr'));
  const dispatch = useDispatch();

  function handleGoButton() {
    if (!typedString) {
      dispatch(setError('Nothing to search'));
      searchParams.delete('substr');
      searchParams.delete('tags');
      setSearchParams(searchParams);
      return;
    }
    const { searchStr, tagArr } = getSearchStrAndTags(typedString);
    if (!searchStr) searchParams.delete('substr');
    if (!tagArr) searchParams.delete('tags');
    if (searchStr || tagArr) searchParams.delete('page');
    let paramsObj = Object.fromEntries(searchParams);

    if (searchStr) paramsObj = { ...paramsObj, substr: searchStr };
    if (tagArr) paramsObj = { ...paramsObj, tags: tagArr };

    setSearchParams(paramsObj);
    
  }

  function handleKeyPress(e) {
    setTypedString(e.target.value);
    if (e.key === 'Enter') handleGoButton();
    dispatch(clearError());
  }

  return (
    <div className="my-4 grid grid-cols-[8fr_1fr] justify-center">
      <input
        className="my-2 border-2 border-stone-300 text-lg"
        type="text"
        placeholder="type there for searching"
        defaultValue={typedString}
        onChange={(e) => setTypedString(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      <Button
        addStyling="bg-blue-500 text-blue-100 active:bg-blue-300 hover:bg-blue-400"
        onClick={handleGoButton}
      >
        Go!
      </Button>
    </div>
  );
}

export default SearchElement;
