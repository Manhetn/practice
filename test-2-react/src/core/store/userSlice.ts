import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';
import { IUserData } from '../interfaces';
import SessionStorageService from '../services/SesseionStorageServiсe';

interface IUserState {
  data: IUserData;
}

const userData = SessionStorageService.getUserData();

const initialState: IUserState = {
  data: userData
    ? userData
    : {
        email: '',
        agreement: false,
      },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSetUserData: (state, action: PayloadAction<IUserData>) => {
      state.data = action.payload;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;

const { userSetUserData } = actions;

export const setUserEmail =
  (payload: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const currentState = getState();

    const userData = {
      email: payload,
      agreement: currentState.user.data.agreement,
    };

    dispatch(userSetUserData(userData));
    SessionStorageService.setUserData(userData);
  };

export const setUserAgreement =
  (payload: boolean) => (dispatch: AppDispatch, getState: () => RootState) => {
    const currentState = getState();

    const userData = {
      email: currentState.user.data.email,
      agreement: payload,
    };

    dispatch(userSetUserData(userData));
    SessionStorageService.setUserData(userData);
  };

export const setUserData = (payload: IUserData) => (dispatch: AppDispatch) => {
  dispatch(userSetUserData(payload));
  SessionStorageService.setUserData(payload);
};

export const getUserData =
  () =>
  (state: RootState): IUserData =>
    state.user.data;

export default userReducer;
