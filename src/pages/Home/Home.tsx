import React, { useEffect, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { emailState, passwordState } from '../../recoil/user';
import css from './Home.module.scss';
import { BASE_URL } from '../../config';
import axios from 'axios';
import Button from './Button/Button';
import Input from './Input/Input';

function Home(): JSX.Element {
  const navigate = useNavigate();

  const [email, setEmail] = useRecoilState<string>(emailState);
  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useRecoilState<string>(passwordState);
  const handlePwInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const login = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/auth/signin`, {
        email,
        password,
      })
      .then(res => {
        if (res.data.access_token) {
          setEmail('');
          setPassword('');
          localStorage.setItem('token', res.data.access_token);
          navigate('/todo');
        } else {
          alert('회원 정보를 확인해주세요.');
        }
      });
  };

  const signup = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/auth/signup`, {
        email,
        password,
      })
      .then(res => {
        if (res.data.access_token) alert('회원가입 성공!');
        else alert('회원가입 실패!');
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) navigate('/todo');
  }, []);

  return (
    <div className={css.container}>
      <form>
        <Input
          type="email"
          value={email}
          label="이메일"
          onChange={handleEmailInput}
          placeholder="이메일을 입력해주세요."
        />
        <Input
          type="password"
          value={password}
          label="비밀번호"
          onChange={handlePwInput}
          placeholder="패스워드를 입력해주세요."
        />
        <Button name="로그인" onClick={login} />
        <Button name="회원가입" onClick={signup} />
      </form>
    </div>
  );
}

export default Home;
