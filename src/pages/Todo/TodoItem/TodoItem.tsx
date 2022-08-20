import React, { useState } from 'react';
import css from './TodoItem.module.scss';
import { BASE_URL } from '../../../config';
import axios from 'axios';
import Button from '../Button/Button';
import { SetterOrUpdater } from 'recoil';

interface TodoProps {
  id: number;
  todo: string;
  isCompleted: boolean;
  setIsUpdated: SetterOrUpdater<boolean>;
}

function TodoItem(props: TodoProps): JSX.Element {
  const { id, todo, isCompleted, setIsUpdated } = props;
  const token = localStorage.getItem('token');

  const [newTodo, setNewTodo] = useState(todo);
  const handleTodoInput = (e: any): void => setNewTodo(e.target.value);

  const [isCompletedTodo, setIsCompletedTodo] = useState(isCompleted);
  const handleCompletedInput = () => setIsCompletedTodo(!isCompletedTodo);

  const [update, setUpdate] = useState(false);
  const updateBtn = () => {
    update ? updateTodo() : setUpdate(true);
  };

  const updateTodo = () => {
    if (newTodo !== '') {
      axios
        .put(
          `${BASE_URL}/todos/${id}`,
          {
            todo: newTodo,
            isCompleted: isCompletedTodo,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(res => {
          if (res.status === 200) {
            setIsUpdated(true);
            setUpdate(false);
          }
        });
    } else alert('할 일을 입력해주세요!');
  };

  return (
    <div className={css.container}>
      <li className={css.list}>
        <span
          className={`${css.text} ${update ? css.inline : css.inlineBlock}`}
        >
          {!update && todo}
        </span>
        {update && (
          <input
            className={css.input}
            value={newTodo}
            onChange={handleTodoInput}
          />
        )}
        {update ? (
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
        )}
        <button className={css.updateBtn} onClick={updateBtn}>
          {update ? '제출' : '수정'}
        </button>
        {update && (
          <Button
            type="cancel"
            setIsUpdated={setIsUpdated}
            setNewTodo={setNewTodo}
            todo={todo}
            setIsCompletedTodo={setIsCompletedTodo}
            isCompleted={isCompleted}
            setUpdate={setUpdate}
          />
        )}
        <Button type="delete" id={id} setIsUpdated={setIsUpdated} />
      </li>
    </div>
  );
}

export default TodoItem;
