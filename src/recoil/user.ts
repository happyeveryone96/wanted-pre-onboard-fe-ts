import { atom, selector } from 'recoil';

export const emailState = atom({
  key: 'emailState',
  default: '',
});

export const passwordState = atom({
  key: 'passwordState',
  default: '',
});

export const signValidState = selector({
  key: 'signValidState',
  get: ({ get }) => {
    const email = get(emailState);
    const password = get(passwordState);

    return email.includes('@') && password.length >= 8;
  },
});
