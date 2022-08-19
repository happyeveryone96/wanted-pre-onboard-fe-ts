import React from 'react';
import css from './Input.module.scss';

interface InputProps {
  value: string;
  type: string;
  label: string;
  onChange(e: any): void;
  placeholder: string;
}

function Input(props: InputProps): JSX.Element {
  const { value, type, label, onChange, placeholder } = props;

  return (
    <div className={css.inputWrap}>
      <label htmlFor={type}>{label}</label>
      <input
        className={css.input}
        value={value}
        onChange={onChange}
        name={type}
        placeholder={placeholder}
        autoComplete="off"
        type={type}
        spellCheck={false}
      />
    </div>
  );
}

export default Input;
