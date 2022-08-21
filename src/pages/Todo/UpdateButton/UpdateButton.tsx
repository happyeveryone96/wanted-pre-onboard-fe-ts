import React, { MouseEventHandler } from 'react';
import css from './UpdateButton.module.scss';
import { useSetRecoilState } from 'recoil';
import { updateState } from '../../../recoil/todo';
import { todoApi } from '../../../apis/Todo/todo';

interface ButtonProps {
  id: number;
  update: boolean;
  newTodo: string;
  isCompletedTodo: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

function Button(props: ButtonProps): JSX.Element {
  const { id, update, newTodo, isCompletedTodo, setUpdate } = props;
  const setIsUpdated = useSetRecoilState(updateState);

  const updateBtn: MouseEventHandler<HTMLButtonElement> = (): void => {
    update ? updateTodo() : setUpdate!(true);
  };

  const updateTodo = (): void => {
    if (newTodo !== '') {
      todoApi
        .updateTodo(id, {
          todo: newTodo,
          isCompleted: isCompletedTodo,
        })
        .then(res => {
          if (res.status === 200) {
            setIsUpdated(true);
            setUpdate!(false);
          }
        });
    } else alert('할 일을 입력해주세요!');
  };

  return (
    <button className={css.updateBtn} onClick={updateBtn}>
      {update ? '제출' : '수정'}
    </button>
  );
}

export default Button;
