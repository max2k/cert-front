import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/user/userSlice';
import Button from './Button';

function Header() {
  const userName = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate('/');
  }

  return (
    <header>
      <div className="flex h-12 items-center justify-between bg-stone-700">
        <div className="flex items-center">
          <span className="mx-4 font-semibold text-stone-400">Admin UI</span>

          <Button color="blue">Add new</Button>
        </div>
        {userName ? (
          <div className="flex items-center gap-2 font-semibold text-stone-300">
            <div>🧑</div>
            <div>{userName}</div>
            <button className="mx-2 uppercase" onClick={handleLogout}>
              logout
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </header>
  );
}

export default Header;
