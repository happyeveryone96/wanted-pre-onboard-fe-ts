import React, { ChangeEvent } from 'react';
import css from './Input.module.scss';
import { useRecoilState } from 'recoil';
import { emailState, passwordState } from '../../../recoil/user';

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
}

function Input(props: InputProps): JSX.Element {
  const { label, type, placeholder } = props;
  const isEmail: boolean = type === 'email';

  const [email, setEmail] = useRecoilState<string>(emailState);
  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useRecoilState<string>(passwordState);
  const handlePwInput = (e: ChangeEvent<HTMLInputElement>): void => {
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
