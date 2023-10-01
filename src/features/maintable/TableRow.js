import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import { formatDate2 } from '../../utils/helpers';
import ConfimDelete from './ConfirmDelete';
import EditCert from '../certificate/EditCert';
import { useSelector } from 'react-redux';

function TableRow({ tableRow }) {
  const { createDate, name, description, price, tags, id } = tableRow;
  const isLogged = useSelector((state) => state.user.jwtToken !== '');
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
          <Button color="blue" disabled={!isLogged}>
            View
          </Button>
          <Modal.Open opens="edit">
            <Button color="yellow" disabled={!isLogged}>
              Edit
            </Button>
          </Modal.Open>
          <Modal.Window name="edit" title={`Edit element ${id}`}>
            <EditCert row={tableRow} />
          </Modal.Window>

          <Modal.Open opens="delete">
            <Button color="red" disabled={!isLogged}>
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
