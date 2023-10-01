import { useState } from 'react';
import ErrorLine from '../../ui/ErrorLine';
import TagInput from './TagInput';
import Button from '../../ui/Button';
import { validateInput, newErrorState } from './validators';
import { useDispatch } from 'react-redux';
import { incUpdateKey, updateCert } from './certSlice';

function EditCert({ row, onCloseModal }) {
  const { id, name, description, price, tags, duration } = row;

  const [changedState, setChangedState] = useState({});
  const [errorState, setErrorState] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
  });

  const dispatch = useDispatch();

  function handleOnChange(e) {
    if (!e.target.value) return;
    const { name, value } = e.target;
    if (validateInput(e.target)) {
      const newState = { ...changedState, [name]: value };
      setChangedState(newState);
      setErrorState({ ...errorState, [name]: '' });
    } else {
      const newState = newErrorState(name, errorState);
      setErrorState(newState);
    }
  }

  function handleTagChange(tags) {
    const newState = { ...changedState, tags };
    setChangedState(newState);
  }

  function handleOnSave() {
    console.log(changedState);
    dispatch(updateCert({ certId: id, fields: changedState })).then(() => {
      onCloseModal();
      dispatch(incUpdateKey());
    });
  }

  const labelStyle = 'mx-2';

  return (
    <>
      <div className="grid grid-cols-[1fr_5fr] gap-1">
        <label className={labelStyle} htmlFor="name">
          Title
        </label>

        <div>
          <input
            className="w-full border-2"
            type="text"
            name="name"
            defaultValue={name}
            onChange={handleOnChange}
          />
          <ErrorLine message={errorState.title} />
        </div>
        <label className={labelStyle} htmlFor="decription">
          Description
        </label>
        <div>
          <textarea
            className="h-24 w-full border-2 align-top"
            type="text"
            name="description"
            defaultValue={description}
            onChange={handleOnChange}
          ></textarea>
          <ErrorLine message={errorState.description} />
        </div>
        <label className={labelStyle} htmlFor="duration">
          Duration
        </label>
        <div>
          <input
            className="w-full border-2"
            type="text"
            name="duration"
            defaultValue={duration}
            onChange={handleOnChange}
          />
          <ErrorLine message={errorState.duration} />
        </div>
        <label className={labelStyle} htmlFor="price">
          Price
        </label>
        <div>
          <input
            className="w-full border-2"
            type="text"
            name="price"
            defaultValue={price}
            onChange={handleOnChange}
          />
          <ErrorLine message={errorState.price} />
        </div>
        <label className={labelStyle} htmlFor="tags">
          Tags
        </label>
        <TagInput inputTags={tags} onChange={handleTagChange} />
      </div>
      <div className="mt-2 text-center">
        <Button color="blue" onClick={handleOnSave}>
          Save
        </Button>
        <Button color="stone" onClick={onCloseModal}>
          Cancel
        </Button>
      </div>
    </>
  );
}

export default EditCert;
