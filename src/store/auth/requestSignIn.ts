import { showMessage } from 'react-native-flash-message';

import axios from 'axios';
import { GetState, SetState } from 'zustand';

import { navigate } from '#/routes/rootNavigation';
import { api } from '#/services/api';
import endpoints from '#/shared/endpoints';
import { IUser } from '#/shared/interfaces/IUser';

import { AuthStates, ISignUpRequest } from './useAuthStore';

interface IAuthResponseAxios {
  user: IUser;
  token: string;
}

export const authActionsSlice = (
  set: SetState<AuthStates>,
  get: GetState<AuthStates>,
) => ({
  signInRequest: async (email: string, password: string): Promise<any> => {
    set(() => ({ loading: true }));
    try {
      const response = await api.post<IAuthResponseAxios>(endpoints.sessions, {
        email,
        password,
      });
      const { user, token } = response.data;

      api.defaults.headers.Authorization = `Bearer ${token}`;

      set(() => ({ loading: false, token, isSigned: true }));
      return user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.tron.log('[SIGN IN REQUEST error]:: ', error);
        set(() => ({ loading: false }));
        showMessage({
          message: `${error.message}`,
          type: 'danger',
          icon: 'danger',
          floating: true,
          duration: 2000,
        });
      }
    }
  },
  signUpRequest: async ({
    name,
    email,
    password,
    device_id,
  }: ISignUpRequest): Promise<void> => {
    set(() => ({ loading: true }));

    try {
      const { data } = await api.post(endpoints.signup, {
        name,
        email,
        password,
        device_id,
      });

      console.tron.log('data', data);
      set(() => ({ loading: false }));

      navigate('SignInScreen');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.tron.log('[SIGN UP REQUEST error]:: ', error);
        set(() => ({ loading: false }));
        showMessage({
          message: `${error.response?.data.message}`,
          type: 'danger',
          icon: 'danger',
          floating: true,
          duration: 2000,
        });
      }
    }
  },
  signOut: () => {
    set(() => ({ token: null, isSigned: false }));
  },
});
