import { HiXMark } from 'react-icons/hi2';

function ErrorBanner({ errorMessage, onClose }) {
  if (errorMessage === '') return <div></div>;

  return (
    <div
      className="m-4 flex flex-grow justify-between border-4 border-red-800 bg-red-300 p-2 font-semibold text-red-900"
      hidden="hidden"
    >
      <span>{errorMessage}</span>
      <span className="hover:cursor-pointer" onClick={onClose}>
        <HiXMark />
      </span>
    </div>
  );
}

export default ErrorBanner;
