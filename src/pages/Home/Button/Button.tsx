import React, { MouseEvent } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  emailState,
  passwordState,
  signValidState,
} from '../../../recoil/user';
import css from './Button.module.scss';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../apis/Auth/auth';

interface ButtonProps {
  name: string;
}

function Button(props: ButtonProps): JSX.Element {
  const { name } = props;
  const signValid = useRecoilValue<boolean>(signValidState);

  const navigate = useNavigate();

  const [email, setEmail] = useRecoilState<string>(emailState);
  const [password, setPassword] = useRecoilState<string>(passwordState);

  const login = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    try {
      const res = await authApi.signIn({
        email,
        password,
      });
      setEmail('');
      setPassword('');
      localStorage.setItem('token', res.data.access_token);
      navigate('/todo');
    } catch {
      alert('회원 정보를 확인해주세요.');
    }
  };

  const signup = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
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

  const isLogin: boolean = name === '로그인';

  return (
    <button
      className={`${css.btn} ${!signValid ? css.disabled : undefined}`}
      disabled={!signValid}
      onClick={isLogin ? login : signup}
    >
      {name}
    </button>
  );
}

export default Button;
