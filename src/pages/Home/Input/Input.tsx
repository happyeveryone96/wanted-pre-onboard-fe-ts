import React, { ChangeEvent } from 'react';
import css from './Input.module.scss';

interface InputProps {
  label: string;
  value: string;
  type: string;
  placeholder: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}

function Input(props: InputProps): JSX.Element {
  const { label, value, type, placeholder, onChange } = props;

  return (
    <div className={css.inputWrap}>
      <label htmlFor={type}>{label}</label>
      <input
        className={css.input}
        value={value}
        type={type}
        name={type}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}

export default Input;
