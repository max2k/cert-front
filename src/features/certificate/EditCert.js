import { useState } from 'react';
import ErrorLine from '../../ui/ErrorLine';
import TagInput from './TagInput';
import Button from '../../ui/Button';
import {
  validateInput,
  newErrorState,
  setErrorsForRequired,
} from './validators';
import { useRevalidator } from 'react-router-dom';
import TextOrChild from '../../ui/TextOrChild';
import { isAllFieldsEmpty } from '../../utils/helpers';

function EditCert({ row, onCloseModal, type, onSaveAction }) {
  if (!row)
    row = {
      name: '',
      description: '',
      price: 0,
      duration: 100,
      tags: [],
    };
  const { name, description, price, tags, duration } = row;

  const isViewDialog = type === 'View';
  const isCreateDialog = type === 'Create';

  let initChangedState = {};

  if (isCreateDialog) initChangedState = { price: 0, duration: 100 };

  const [changedState, setChangedState] = useState(initChangedState);

  let initialState = {
    name: '',
    description: '',
    duration: '',
    price: '',
  };
  if (isCreateDialog) initialState = setErrorsForRequired(initialState);

  const [errorState, setErrorState] = useState(initialState);

  const isAnyInputError = !isAllFieldsEmpty(errorState);

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
    onSaveAction(changedState).then(() => {
      revaidator.revalidate();
      onCloseModal();
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
              placeholder="Certificate name"
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
              placeholder="Certificate description"
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
              placeholder="Certificate duration"
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
              placeholder="Certificate price"
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
          <Button
            color="blue"
            onClick={handleOnSave}
            disabled={isAnyInputError}
          >
            {isCreateDialog ? 'Create' : 'Save'}
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
