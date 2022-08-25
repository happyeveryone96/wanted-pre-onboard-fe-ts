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
  const { todo, isCompleted, setNewTodo, setIsCompletedTodo, setUpdate } =
    props;

  const cancelBtn = () => {
    setNewTodo(todo);
    setIsCompletedTodo(isCompleted);
    setUpdate(false);
  };

  return (
    <input
      type="button"
      className={css.cancelBtn}
      onClick={cancelBtn}
      alt="할 일 수정 취소 버튼"
      value="취소"
    />
  );
}

export default CancelButton;
