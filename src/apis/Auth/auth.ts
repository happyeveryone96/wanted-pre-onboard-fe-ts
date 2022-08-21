import { SignParams } from './types';
import instance from '../axios';

export const authApi = {
  signIn(body: SignParams) {
    return instance.post('/auth/signin', body);
  },
  signUp(body: SignParams) {
    return instance.post('/auth/signup', body);
  },
};
