function Button({ addStyling, onClick, children, color, disabled }) {
  const baseStyle = 'm-2 rounded-md p-2 font-semibold';
  if (!addStyling) addStyling = '';

  switch (color) {
    case 'red':
      addStyling +=
        ' bg-red-600 active:bg-red-200 hover:bg-red-500 text-red-50 active:text-red-800 disabled:bg-red-200 disabled:text-red-50';
      break;

    case 'blue':
      addStyling +=
        ' bg-blue-600 active:bg-blue-200 hover:bg-blue-500 text-blue-50 active:text-blue-800  disabled:bg-blue-200 disabled:text-blue-50';
      break;

    case 'yellow':
      addStyling +=
        ' bg-yellow-600 active:bg-yellow-200 hover:bg-yellow-500 text-yellow-50 active:text-yellow-800  disabled:bg-yellow-200 disabled:text-yellow-50';
      break;

    case 'stone':
      addStyling +=
        ' bg-stone-600 active:bg-stone-200 hover:bg-stone-500 text-stone-50 active:text-stone-800';
      break;

    default:
  }

  const buttonStyle = baseStyle + ' ' + addStyling;

  if (onClick)
    return (
      <button className={buttonStyle} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );

  return (
    <button className={buttonStyle} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
