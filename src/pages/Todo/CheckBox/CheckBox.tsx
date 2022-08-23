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

  return update ? (
    <input
      className={css.checkBox}
      type="checkbox"
      checked={isCompletedTodo}
      onChange={handleCompletedInput}
    />
  ) : (
    <input
      className={`${css.checkBox} ${css.notAllowed}`}
      type="checkbox"
      checked={isCompletedTodo}
      readOnly
    />
  );
}

export default CheckBox;
