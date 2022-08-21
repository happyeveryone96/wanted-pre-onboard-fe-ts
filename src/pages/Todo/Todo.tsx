import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoItem from './TodoItem/TodoItem';
import css from './Todo.module.scss';
import { useRecoilState } from 'recoil';
import { todoState, updateState, todoListState } from '../../recoil/todo';
import Input from './Input/Input';
import { todoApi } from '../../apis/Todo/todo';

interface TodoProps {
  id: number;
  todo: string;
  isCompleted: boolean;
}

function Todo(): JSX.Element {
  const [todo, setTodo] = useRecoilState(todoState);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
    if (token === null) navigate('/');
  }, []);

  const [isUpdated, setIsUpdated] = useRecoilState(updateState);
  const createTodo = async (): Promise<void> => {
    try {
      await todoApi.createTodo({ todo });
      setIsUpdated(true);
      setTodo('');
    } catch {
      alert('할 일을 입력해주세요!');
    }
  };

  const [todoList, setTodoList] = useRecoilState<TodoProps[]>(todoListState);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const res = await todoApi.getTodos();
      setTodoList(res.data);
    };
    fetchData();
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
          />
        );
      })}
    </div>
  );
}

export default Todo;
