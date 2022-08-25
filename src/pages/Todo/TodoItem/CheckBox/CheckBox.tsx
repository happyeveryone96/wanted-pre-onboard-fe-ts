import React from 'react';
import css from './CheckBox.module.scss';

interface CheckBoxProps {
  update: boolean;
  isCompletedTodo: boolean;
  setIsCompletedTodo: React.Dispatch<React.SetStateAction<boolean>>;
}

function CheckBox(props: CheckBoxProps) {
  const { update, isCompletedTodo, setIsCompletedTodo } = props;
  const handleCompletedInput = () => setIsCompletedTodo(!isCompletedTodo);

  return (
    <input
      className={`${css.checkBox} ${!update && css.notAllowed}`}
      type="checkbox"
      checked={isCompletedTodo}
      onChange={update ? handleCompletedInput : undefined}
      readOnly={!update}
    />
  );
}

export default CheckBox;
