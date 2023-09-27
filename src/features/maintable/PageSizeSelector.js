const pageSizes = [5, 10, 15, 20, 25];

function PageSizeSelector({ onChange }) {
  return (
    <div className="flex justify-end">
      <select className="w-14 border-2 p-1" onChange={onChange}>
        {pageSizes.map((size) => (
          <option value={size}>{size}</option>
        ))}
      </select>
    </div>
  );
}

export default PageSizeSelector;
