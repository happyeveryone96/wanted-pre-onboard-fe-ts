import React, { useEffect, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { emailState, passwordState } from '../../recoil/user';
import css from './Home.module.scss';
import Button from './Button/Button';
import Input from './Input/Input';
import { authApi } from '../../apis/Auth/auth';

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) navigate('/todo');
  }, []);

  return (
    <div className={css.container}>
      <form>
        <Input
          label="이메일"
          value={email}
          type="email"
          placeholder="이메일을 입력해주세요."
          onChange={handleEmailInput}
        />
        <Input
          label="비밀번호"
          value={password}
          type="password"
          placeholder="패스워드를 입력해주세요."
          onChange={handlePwInput}
        />
        <Button name="로그인" onClick={login} />
        <Button name="회원가입" onClick={signup} />
      </form>
    </div>
  );
}

export default Home;
