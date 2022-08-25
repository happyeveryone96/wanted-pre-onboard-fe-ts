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
      alt={isCompletedTodo ? '완료된 할 일' : '완료되지 않은 할 일'}
    />
  );
}

export default CheckBox;
