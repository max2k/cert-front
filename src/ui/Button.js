function Button({ addStyling, onClick, children }) {
  const baseStyle = 'm-2 rounded-md bg-blue-800 p-2 font-semibold';
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
