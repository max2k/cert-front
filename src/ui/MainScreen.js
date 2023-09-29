import { useDispatch, useSelector } from 'react-redux';
import CertTable from '../features/maintable/CertTable';
import SearchElement from '../features/search/SearchElement';
import ErrorBanner from './ErrorBanner';
import { clearError } from '../features/error/errorSlice';

function MainScreen() {
  const errorMessage = useSelector((state) => state.error.errorMessage);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-center">
      <ErrorBanner
        errorMessage={errorMessage}
        onClose={() => dispatch(clearError())}
      />
      <SearchElement />
      <CertTable />
    </div>
  );
}

export default MainScreen;
