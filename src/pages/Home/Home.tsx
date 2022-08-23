import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './Home.module.scss';
import Button from './Button/Button';
import Input from './Input/Input';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) navigate('/todo');
  }, []);

  return (
    <div className={css.container}>
      <form>
        <Input
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요."
        />
        <Input
          label="비밀번호"
          type="password"
          placeholder="패스워드를 입력해주세요."
        />
        <Button name="로그인" />
        <Button name="회원가입" />
      </form>
    </div>
  );
}

export default Home;
