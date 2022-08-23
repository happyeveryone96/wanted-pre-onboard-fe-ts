import React from 'react';

interface CheckBoxProps {
  update: boolean;
  isCompletedTodo: boolean;
  setIsCompletedTodo: React.Dispatch<React.SetStateAction<boolean>>;
}

function CheckBox(props: CheckBoxProps) {
  const { update, isCompletedTodo, setIsCompletedTodo } = props;
  const handleCompletedInput = () => setIsCompletedTodo(!isCompletedTodo);

  return update ? (
    <input
      type="checkbox"
      checked={isCompletedTodo}
      onChange={handleCompletedInput}
    />
  ) : (
    <input
      type="checkbox"
      checked={isCompletedTodo}
      readOnly
      style={{ cursor: 'not-allowed' }}
    />
  );
}

export default CheckBox;
