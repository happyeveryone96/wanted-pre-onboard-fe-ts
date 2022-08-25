import React, { ChangeEvent } from 'react';
import css from './UpdateInput.module.scss';

interface UpdateInputProps {
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
}

function UpdateInput(props: UpdateInputProps) {
  const { newTodo, setNewTodo } = props;
  const handleTodoInput = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTodo(e.target.value);

  return (
    <input
      className={css.input}
      value={newTodo}
      onChange={handleTodoInput}
      spellCheck={false}
      alt="할 일 수정 사항 입력하는 곳"
    />
  );
}

export default UpdateInput;
