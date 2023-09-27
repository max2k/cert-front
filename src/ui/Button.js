function Button({ addStyling, onClick, children }) {
  const baseStyle =
    'mx-2 my-2 rounded-md bg-blue-800 px-2 py-2 font-semibold text-blue-100';
  const buttonStyle = baseStyle + ' ' + addStyling;

  if (onClick)
    return (
      <button className={buttonStyle} onClick={onClick}>
        {' '}
        {children}
      </button>
    );

  return <button className={buttonStyle}>{children}</button>;
}

export default Button;
