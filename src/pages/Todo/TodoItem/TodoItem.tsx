import React, { useState } from 'react';
import css from './TodoItem.module.scss';
import UpdateButton from './UpdateButton/UpdateButton';
import DeleteButton from './DeleteButton/DeleteButton';
import CancelButton from './CancelButton/CancelButton';
import CheckBox from './CheckBox/CheckBox';
import UpdateInput from './UpdateInput/UpdateInput';

interface TodoProps {
  id: number;
  todo: string;
  isCompleted: boolean;
}

function TodoItem(props: TodoProps) {
  const { id, todo, isCompleted } = props;

  const [newTodo, setNewTodo] = useState(todo);
  const [isCompletedTodo, setIsCompletedTodo] = useState(isCompleted);
  const [update, setUpdate] = useState(false);

  return (
    <div className={css.container}>
      <li className={css.list}>
        <span
          className={`${css.text} ${update ? css.inline : css.inlineBlock}`}
        >
          {!update && todo}
        </span>
        {update && <UpdateInput newTodo={newTodo} setNewTodo={setNewTodo} />}
        <CheckBox
          update={update}
          isCompletedTodo={isCompletedTodo}
          setIsCompletedTodo={setIsCompletedTodo}
        />
        <UpdateButton
          id={id}
          update={update}
          newTodo={newTodo}
          isCompletedTodo={isCompletedTodo}
          setUpdate={setUpdate}
        />
        {update && (
          <CancelButton
            todo={todo}
            isCompleted={isCompleted}
            setNewTodo={setNewTodo}
            setIsCompletedTodo={setIsCompletedTodo}
            setUpdate={setUpdate}
          />
        )}
        <DeleteButton id={id} />
      </li>
    </div>
  );
}

export default TodoItem;
