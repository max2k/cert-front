import { useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

function TagInput({ inputTags, onChange }) {
  const [tags, setTags] = useState(
    inputTags.map((tag) => ({ id: tag.id.toString(), text: tag.name })),
  );

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  function handleAddition(tag) {
    const newArr = [...tags, tag];
    setTags(newArr);
    if (onChange) onChange(newArr);
  }

  function handleDelete(id) {
    const newArr = [...tags];
    newArr.splice(id, 1);
    setTags(newArr);
    if (onChange) onChange(newArr);
  }

  return (
    <ReactTags
      tags={tags}
      classNames={{
        tag: 'border-2 p-1 m-1 inline-block',
        tagInputField: 'border-2 p-1 w-full',
      }}
      delimiters={delimiters}
      inputFieldPosition="top"
      handleAddition={handleAddition}
      handleDelete={handleDelete}
      autocomplete
    />
  );
}

export default TagInput;
