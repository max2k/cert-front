import { useSelector } from 'react-redux';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import { formatDate2 } from '../../utils/helpers';
import ConfimDelete from './ConfirmDelete';

function TableRow({ tableRow }) {
  const { createDate, name, description, price, tags, id } = tableRow;
  const baseStyle = 'p-2 bg-stone-100 border-stone-300';

  return (
    <>
      <div className={baseStyle}>{formatDate2(createDate)}</div>
      <div className={baseStyle}>{name}</div>
      <div className={baseStyle}>{tags.map((tag) => `${tag.name} `)}</div>
      <div className={baseStyle}>{description}</div>
      <div className={`${baseStyle} text-center`}>{price}</div>
      <div className={baseStyle}>
        <Modal>
          <Button addStyling="bg-blue-600 active:bg-blue-200 hover:bg-blue-500 text-blue-50 active:text-blue-800">
            View
          </Button>
          <Modal.Open opens="edit">
            <Button addStyling="bg-yellow-600 active:bg-yellow-200 hover:bg-yellow-500 text-yellow-50 active:text-yellow-800">
              Edit
            </Button>
          </Modal.Open>
          <Modal.Window name="edit"></Modal.Window>

          <Modal.Open opens="delete">
            <Button addStyling="bg-red-600 active:bg-red-200 hover:bg-red-500 text-red-50 active:text-red-800">
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window name="delete" title="Confirm deletion">
            <ConfimDelete id={id} />
          </Modal.Window>
        </Modal>
      </div>
    </>
  );
}

export default TableRow;
