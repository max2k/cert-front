import { useState } from 'react';
import { useRouteError } from 'react-router-dom';

function ErrorBanner() {
  const error = useRouteError();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return <div></div>;

  return (
    <div
      className="m-4 flex flex-grow justify-between border-4 border-red-800 bg-red-300 p-2 font-semibold text-red-900"
      hidden="hidden"
    >
      <span>Error-{error.message}</span>
      <span
        className="hover:cursor-pointer"
        onClick={() => setIsVisible(false)}
      >
        X
      </span>
    </div>
  );
}

export default ErrorBanner;
