import React, { MouseEvent, useEffect, useTransition } from 'react';
import {
  useRecoilValue,
  useRecoilState,
  useRecoilRefresher_UNSTABLE,
} from 'recoil';
import {
  emailState,
  passwordState,
  authValidState,
} from '../../../recoil/auth';
import { todoListState } from '../../../recoil/todo';
import css from './Button.module.scss';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../apis/Auth/auth';

interface ButtonProps {
  name: string;
}

function Button(props: ButtonProps) {
  const { name } = props;
  const isSignIn = name === '로그인';
  const signValid = useRecoilValue(authValidState);

  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);

  const navigate = useNavigate();
  const [, startTransition] = useTransition();
  const refreshTodoList = useRecoilRefresher_UNSTABLE(todoListState);

  const auth = async (type: string, e: MouseEvent<HTMLButtonElement>) => {
    const isSignUp = type === 'signUp';
    e.preventDefault();
    try {
      const res = await (isSignUp ? authApi.signUp : authApi.signIn)({
        email,
        password,
      });
      localStorage.setItem('token', res.data.access_token);
      if (isSignUp)
        alert('회원가입에 성공했습니다.\n투두 리스트 페이지로 이동합니다.');
      startTransition(() => refreshTodoList());
      navigate('/todo');
    } catch {
      isSignUp
        ? alert('회원가입에 실패했습니다.')
        : alert('회원 정보를 확인해주세요.');
    }
  };

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  return (
    <button
      className={`${css.btn} ${!signValid ? css.disabled : undefined}`}
      disabled={!signValid}
      onClick={e => auth(isSignIn ? 'signIn' : 'signUp', e)}
    >
      {name}
    </button>
  );
}

export default Button;
