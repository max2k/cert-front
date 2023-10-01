function ErrorLine({ message }) {
  if (message?.length > 0)
    return <div className="ml-2 text-sm text-red-600">{message}</div>;
  return <div className="ml-2 text-sm text-red-600">&nbsp;</div>;
}

export default ErrorLine;
