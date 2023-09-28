import CertTable from '../features/maintable/CertTable';
import SearchElement from '../features/search/SearchElement';

function MainScreen() {
  return (
    <div className="flex flex-col justify-center">
      <SearchElement />
      <CertTable />
    </div>
  );
}

export default MainScreen;
