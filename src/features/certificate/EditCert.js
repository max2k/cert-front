import { useState } from 'react';
import ErrorLine from '../../ui/ErrorLine';
import TagInput from './TagInput';
import Button from '../../ui/Button';
import { validateInput, newErrorState } from './validators';
import { useDispatch } from 'react-redux';
import { useRevalidator } from 'react-router-dom';
import { updateCert } from './certSlice';
import TextOrChild from '../../ui/TextOrChild';

function EditCert({ row, onCloseModal, type }) {
  const { id, name, description, price, tags, duration } = row;

  const isViewDialog = type === 'View';

  const [changedState, setChangedState] = useState({});
  const [errorState, setErrorState] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
  });

  const dispatch = useDispatch();
  const revaidator = useRevalidator();

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
      revaidator.revalidate();
    });
  }

  const labelStyle = 'mx-2 font-semibold';

  return (
    <>
      <div className="grid grid-cols-[1fr_5fr] gap-1">
        <label className={labelStyle} htmlFor="name">
          Title
        </label>

        <TextOrChild text={isViewDialog && name}>
          <div>
            <input
              className="w-full border-2 read-only:border-0"
              type="text"
              name="name"
              defaultValue={name}
              onChange={handleOnChange}
            />
            <ErrorLine message={errorState.name} />
          </div>
        </TextOrChild>

        <label className={labelStyle} htmlFor="decription">
          Description
        </label>

        <TextOrChild text={isViewDialog && description}>
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
        </TextOrChild>

        <label className={labelStyle} htmlFor="duration">
          Duration
        </label>

        <TextOrChild text={isViewDialog && duration}>
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
        </TextOrChild>

        <label className={labelStyle} htmlFor="price">
          Price
        </label>

        <TextOrChild text={isViewDialog && price}>
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
        </TextOrChild>

        <label className={labelStyle} htmlFor="tags">
          Tags
        </label>
        <TextOrChild
          text={isViewDialog && tags.map((tag) => tag.name).join(', ')}
        >
          <TagInput inputTags={tags} onChange={handleTagChange} />
        </TextOrChild>
      </div>
      <div className="mt-2 text-center">
        {!isViewDialog && (
          <Button color="blue" onClick={handleOnSave}>
            Save
          </Button>
        )}
        <Button color="stone" onClick={onCloseModal}>
          Cancel
        </Button>
      </div>
    </>
  );
}

export default EditCert;
