import { useRouteError } from 'react-router-dom';
import ErrorBanner from '../../ui/ErrorBanner';

function RouteError() {
  const error = useRouteError();

  return <ErrorBanner state={error} errorMessage={error.message} />;
}

export default ErrorBanner;
