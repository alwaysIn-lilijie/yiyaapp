/*
 * @Descripttion:
 * @version:
 * @Author: lizhiying
 * @LastEditors:
 * @LastEditTime: 2022-11-09 15:32:16
 */
import { UserController } from '@/controllers';
import { setDeptInfo } from '@/reducers/DeptReducer';

export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
};

const loginRequest = () => ({
  type: TYPES.LOGIN_REQUEST,
  payload: null,
});

const loginSuccess = (user) => ({
  type: TYPES.LOGIN_SUCCESS,
  payload: { user },
});

const loginError = (error) => ({
  type: TYPES.LOGIN_ERROR,
  payload: { error },
});

const clearStore = () => ({
  type: TYPES.CLEAR_STORE,
  payload: null,
});

export const login = (username, password) => async (dispatch, _, { demoMode, networkService }) => {
  try {
    dispatch(loginRequest());
    const userController = new UserController(networkService);
    const { data } = await userController.login({ username, password, demoMode });
    // if (!demoMode) {
    //   networkService.setAccessToken(data.user.accessToken);
    // }
    networkService.setAccessToken(data.user.accessToken);
    dispatch(loginSuccess(data.user));
    dispatch(setDeptInfo({deptName:data.user.sysDept.deptName,deptId:data.user.sysDept.deptId}))
  } catch ({ data }) {
    dispatch(loginError(data?.error ?? 'Invalid credentials'));
  }
};

export const logout = () => async (dispatch, _, { demoMode, networkService }) => {
  try {
    const userController = new UserController(networkService);
    await userController.logout({ demoMode });
  } finally {
    networkService.clearAccessToken();
    dispatch(clearStore());
  }
};
