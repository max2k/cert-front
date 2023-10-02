import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/user/userSlice';
import Button from './Button';
import Modal from './Modal';
import EditCert from '../features/certificate/EditCert';
import { createCert } from '../features/certificate/certSlice';

function Header() {
  const userName = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate('/');
  }

  function handleOnCreate(changedState) {
    return dispatch(createCert({ ...changedState, createDate: new Date() }));
  }

  return (
    <header>
      <div className="flex h-12 items-center justify-between bg-stone-700">
        <div className="flex items-center">
          <span className="mx-4 font-semibold text-stone-400">Admin UI</span>

          {userName && (
            <Modal>
              <Modal.Open opens="create">
                <Button color="blue">Add new</Button>
              </Modal.Open>
              <Modal.Window name="create" title="Create new certificate">
                <EditCert type="Create" onSaveAction={handleOnCreate} />
              </Modal.Window>
            </Modal>
          )}
        </div>

        <div className="flex items-center gap-2 font-semibold text-stone-300">
          {userName ? (
            <>
              <div>🧑</div>
              <div>{userName}</div>
              <button className="mx-2 uppercase" onClick={handleLogout}>
                logout
              </button>
            </>
          ) : (
            <button
              className="mx-2 uppercase"
              onClick={() => {
                navigate('/');
              }}
            >
              login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
