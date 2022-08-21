import { AuthParams } from './types';
import instance from '../axios';

export const authApi = {
  signIn(body: AuthParams) {
    return instance.post('/auth/signin', body);
  },
  signUp(body: AuthParams) {
    return instance.post('/auth/signup', body);
  },
};
