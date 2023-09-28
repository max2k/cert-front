import { useSearchParams } from 'react-router-dom';
import Button from '../../ui/Button';

function SearchElement() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="my-4 grid grid-cols-[8fr_1fr] justify-center">
      <input
        className="my-2 border-2 border-stone-300 text-lg"
        type="text"
        placeholder="type there for searching"
      />
      <Button addStyling="bg-blue-500">Go!</Button>
    </div>
  );
}

export default SearchElement;
