import { useSelector } from 'react-redux';

function Header() {
  const userName = useSelector((state) => state.user.userName);
  console.log(userName);

  return (
    <header>
      <div className="flex items-center justify-between bg-stone-700">
        <div className="flex items-center">
          <span className="mx-4 font-semibold text-stone-400">Admin UI</span>

          <button
            className="mx-2 my-2 rounded-md bg-blue-800 px-2 py-2 font-semibold text-blue-100"
            hidden={!userName}
          >
            Add new
          </button>
        </div>
        <div className="flex items-center gap-2 font-semibold text-stone-300">
          <div>🧑</div>
          <div>{userName}</div>
          <button className="mx-2 uppercase">logout</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
