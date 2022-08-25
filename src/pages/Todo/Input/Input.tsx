import React, { ChangeEvent } from 'react';
import css from './Input.module.scss';
import { useRecoilState } from 'recoil';
import { todoState } from '../../../recoil/todo';

function Input() {
  const [todo, setTodo] = useRecoilState(todoState);
  const handleTodo = (e: ChangeEvent<HTMLInputElement>) =>
    setTodo(e.target.value);

  return (
    <input
      className={css.input}
      value={todo}
      onChange={handleTodo}
      alt="추가할 할 일 입력하는 곳"
    />
  );
}

export default Input;
