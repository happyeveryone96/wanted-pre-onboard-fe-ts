import React, { useState, ChangeEvent } from 'react';
import css from './TodoItem.module.scss';
import UpdateButton from '../UpdateButton/UpdateButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import CancelButton from '../CancelButton/CancelButton';

interface TodoProps {
  id: number;
  todo: string;
  isCompleted: boolean;
}

function TodoItem(props: TodoProps): JSX.Element {
  const { id, todo, isCompleted } = props;

  const [newTodo, setNewTodo] = useState(todo);
  const handleTodoInput = (e: ChangeEvent<HTMLInputElement>): void =>
    setNewTodo(e.target.value);

  const [isCompletedTodo, setIsCompletedTodo] = useState(isCompleted);
  const handleCompletedInput = () => setIsCompletedTodo(!isCompletedTodo);

  const [update, setUpdate] = useState(false);

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
            spellCheck={false}
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
