import React from 'react';
import css from './CancelButton.module.scss';

interface CancelButtonProps {
  todo: string;
  isCompleted: boolean;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  setIsCompletedTodo: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

function CancelButton(props: CancelButtonProps) {
  const { setUpdate, setNewTodo, todo, setIsCompletedTodo, isCompleted } =
    props;

  const cancelBtn = () => {
    setUpdate(false);
    setNewTodo(todo);
    setIsCompletedTodo(isCompleted);
  };

  return (
    <button className={css.cancelBtn} onClick={cancelBtn}>
      취소
    </button>
  );
}

export default CancelButton;
