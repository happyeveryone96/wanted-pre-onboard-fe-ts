import React from 'react';
import { useRecoilValue } from 'recoil';
import { signValidState } from '../../../recoil/user';
import css from './Button.module.scss';

interface ButtonProps {
  name: string;
  onClick(e: any): void;
}

function Button(props: ButtonProps): JSX.Element {
  const { name, onClick } = props;
  const signValid = useRecoilValue<boolean>(signValidState);

  return (
    <button
      className={!signValid ? css.disabled : undefined}
      disabled={!signValid}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default Button;
