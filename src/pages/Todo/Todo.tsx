import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoItem from './TodoItem/TodoItem';
import css from './Todo.module.scss';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { todoState, updateState, todoListState } from '../../recoil/todo';
import Input from './Input/Input';

interface TodoProps {
  id: number;
  todo: string;
  isCompleted: boolean;
  setIsUpdated: SetterOrUpdater<boolean>;
}

function Todo(): JSX.Element {
  const [todo, setTodo] = useRecoilState(todoState);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
    if (token === null) navigate('/');
  }, []);

  const [isUpdated, setIsUpdated] = useRecoilState(updateState);
  const createTodo = (): void => {
    if (todo !== '') {
      axios
        .post(
          `${BASE_URL}/todos`,
          { todo },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(res => {
          if (res.status === 201) {
            setIsUpdated(true);
            setTodo('');
          }
        });
    } else alert('할 일을 입력해주세요!');
  };

  const [todoList, setTodoList] = useRecoilState<TodoProps[]>(todoListState);
  useEffect(() => {
    setIsUpdated(false);
    axios(`${BASE_URL}/todos`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      if (res.status === 200) setTodoList(res.data);
    });
  }, [isUpdated]);

  return (
    <div className={css.container}>
      <div className={css.inputWrap}>
        <Input />
        <button onClick={createTodo}>추가</button>
      </div>
      {todoList.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            id={todo.id}
            todo={todo.todo}
            isCompleted={todo.isCompleted}
            setIsUpdated={setIsUpdated}
          />
        );
      })}
    </div>
  );
}

export default Todo;
