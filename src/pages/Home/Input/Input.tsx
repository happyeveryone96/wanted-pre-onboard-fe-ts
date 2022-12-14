import React, { ChangeEvent } from 'react';
import css from './Input.module.scss';
import { useRecoilState } from 'recoil';
import { emailState, passwordState } from '../../../recoil/auth';

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
}

function Input(props: InputProps) {
  const { label, type, placeholder } = props;
  const isEmail = type === 'email';

  const [email, setEmail] = useRecoilState(emailState);
  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useRecoilState(passwordState);
  const handlePwInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={css.inputWrap}>
      <label htmlFor={type}>{label}</label>
      <input
        className={css.input}
        value={isEmail ? email : password}
        type={type}
        name={type}
        placeholder={placeholder}
        onChange={isEmail ? handleEmailInput : handlePwInput}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}

export default Input;
