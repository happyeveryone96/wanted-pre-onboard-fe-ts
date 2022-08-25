import React, { useEffect, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoItem from './TodoItem/TodoItem';
import css from './Todo.module.scss';
import {
  useRecoilState,
  useRecoilRefresher_UNSTABLE,
  useRecoilValue_TRANSITION_SUPPORT_UNSTABLE,
} from 'recoil';
import { todoState, todoListState } from '../../recoil/todo';
import Input from './Input/Input';
import { todoApi } from '../../apis/Todo/todo';

interface TodoProps {
  id: number;
  todo: string;
  isCompleted: boolean;
}

function Todo() {
  const [todo, setTodo] = useRecoilState(todoState);
  const [, startTransition] = useTransition();
  const refreshTodoList = useRecoilRefresher_UNSTABLE(todoListState);

  const createTodo = async () => {
    try {
      await todoApi.createTodo({ todo });
      setTodo('');
      startTransition(() => refreshTodoList());
    } catch {
      alert('할 일을 입력해주세요!');
    }
  };

  const todoList: TodoProps[] =
    useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(todoListState);

  useEffect(() => {
    startTransition(() => refreshTodoList());
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null) navigate('/');
  }, []);

  return (
    <div className={css.container}>
      <div className={css.inputWrap}>
        <Input />
        <input
          type="button"
          className={css.createBtn}
          onClick={createTodo}
          alt="입력된 할 일 추가 버튼"
          value="추가"
        />
      </div>
      {todoList.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            id={todo.id}
            todo={todo.todo}
            isCompleted={todo.isCompleted}
          />
        );
      })}
    </div>
  );
}

export default Todo;
