import React, { MouseEvent, useEffect, useTransition } from 'react';
import {
  useRecoilValue,
  useRecoilState,
  useRecoilRefresher_UNSTABLE,
} from 'recoil';
import {
  emailState,
  passwordState,
  signValidState,
} from '../../../recoil/user';
import { todoListState } from '../../../recoil/todo';
import css from './Button.module.scss';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../apis/Auth/auth';

interface ButtonProps {
  name: string;
}

function Button(props: ButtonProps) {
  const { name } = props;
  const isSignIn: boolean = name === '로그인';
  const signValid = useRecoilValue<boolean>(signValidState);

  const [email, setEmail] = useRecoilState<string>(emailState);
  const [password, setPassword] = useRecoilState<string>(passwordState);

  const navigate = useNavigate();
  const [, startTransition] = useTransition();
  const refreshTodoList = useRecoilRefresher_UNSTABLE(todoListState);

  const signIn = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await authApi.signIn({
        email,
        password,
      });
      localStorage.setItem('token', res.data.access_token);
      startTransition(() => refreshTodoList());
      navigate('/todo');
      setEmail('');
      setPassword('');
    } catch {
      alert('회원 정보를 확인해주세요.');
    }
  };

  const signUp = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await authApi.signUp({
        email,
        password,
      });
      alert('회원가입 성공!');
    } catch {
      alert('회원가입 실패!');
    }
  };

  return (
    <button
      className={`${css.btn} ${!signValid ? css.disabled : undefined}`}
      disabled={!signValid}
      onClick={isSignIn ? signIn : signUp}
    >
      {name}
    </button>
  );
}

export default Button;
