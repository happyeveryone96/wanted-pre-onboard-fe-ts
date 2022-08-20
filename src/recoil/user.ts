import { atom, selector } from 'recoil';

export const emailState = atom<string>({
  key: 'emailState',
  default: '',
});

export const passwordState = atom<string>({
  key: 'passwordState',
  default: '',
});

export const signValidState = selector<boolean>({
  key: 'signValidState',
  get: ({ get }) => {
    const email = get(emailState);
    const password = get(passwordState);

    return email.includes('@') && password.length >= 8;
  },
});
