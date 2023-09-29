import Button from '../../ui/Button';

function ConfimDelete({ id, onConfirm, onCloseModal }) {
  return (
    <div>
      <p className="m-4 text-xl ">
        Do you really want to delete item with id = {id} ?
      </p>
      <div className="flex justify-end">
        <Button
          addStyling="bg-red-600 active:bg-red-200 hover:bg-red-500 text-red-50 active:text-red-800"
          onClick={() => {
            onConfirm(onCloseModal);
          }}
        >
          Delete
        </Button>
        <Button
          addStyling="bg-green-600 active:bg-green-200 hover:bg-green-500 text-green-50 active:text-green-800"
          onClick={onCloseModal}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default ConfimDelete;
