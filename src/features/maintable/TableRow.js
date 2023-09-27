import Button from '../../ui/Button';
import { formatDate2 } from '../../utils/helpers';

function TableRow({ tableRow }) {
  const { createDate, name, description, price, tags } = tableRow;
  const baseStyle = 'p-2';
  return (
    <>
      <div className={baseStyle}>{formatDate2(createDate)}</div>
      <div className={baseStyle}>{name}</div>
      <div className={baseStyle}>{tags.map((tag) => `${tag.name} `)}</div>
      <div className={baseStyle}>{description}</div>
      <div className={`${baseStyle} text-center`}>{price}</div>
      <div>
        <Button addStyling="bg-blue-500">View</Button>
        <Button addStyling="bg-yellow-500">Edit</Button>
        <Button addStyling="bg-red-500">Delete</Button>
      </div>
    </>
  );
}

export default TableRow;
