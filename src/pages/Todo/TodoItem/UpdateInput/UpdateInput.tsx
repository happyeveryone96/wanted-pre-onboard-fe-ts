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
      placeholder="수정된 할 일을 입력해주세요."
    />
  );
}

export default UpdateInput;
