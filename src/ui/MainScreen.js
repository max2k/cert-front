import { useSelector } from 'react-redux';
import CertTable from '../features/maintable/CertTable';
import SearchElement from '../features/search/SearchElement';

function MainScreen() {
  const updateKey = useSelector((state) => state.cert.updateKey);
  console.log(updateKey);
  return (
    <div className="flex flex-col justify-center">
      <SearchElement />
      <CertTable updateKey={updateKey} key={updateKey} />
    </div>
  );
}

export default MainScreen;
