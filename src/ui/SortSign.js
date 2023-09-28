function SortSign({ direction }) {
  return (
    <>
      {direction ? (
        <span>
          {direction === 'asc' && '▴'}
          {direction === 'desc' && ' ▾'}
        </span>
      ) : (
        ''
      )}
    </>
  );
}

export default SortSign;
