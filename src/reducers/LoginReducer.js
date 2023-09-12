/*
 * @Descripttion:
 * @version:
 * @Author: lizhiying
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-09 13:27:23
 */
import {createSlice, createAction, createAsyncThunk} from '@reduxjs/toolkit';
import { networkService } from '@/networking';
import { storage } from '@/storage';
export const login = createAsyncThunk(
    'login/sign',
    async(thunkAPI) => {

    }
);

const loginReducer = createSlice({
    name:'login',
    initialState:{
        user: undefined,
        selectCount:false,
        loginUser:undefined,
        deptInfo:{
            deptId:'',
            deptName:'',
            deptArea:'',
            deptAreaId:'' //无用
        },
        menuList:[]
    },
    reducers: {
        setMenus(state, action){
            state.menuList = action.payload
        },
        setAppVersion(state, action) {
            state.appVersion = action.payload
        },

        setDeptInfo(state,action){
            state.deptInfo = action.payload;
            // state.deptInfo.deptName = action.payload.deptName;
            // state.deptInfo.deptArea = action.payload.deptArea;
            // state.deptInfo.deptAreaId = action.payload.deptAreaId;
        },
        logout(state,action) {
            // storage.clear()
            state.selectCount=false;
            state.loginUser=undefined;
            state.deptInfo = '';
            state.menuList =[];
            state.user = undefined;
        },
        changeUser(state,action){
            state.user = action.payload;
            state.selectCount=true;
            networkService.setAccessToken(action.payload.token);
        },
        changeDeptInfo(state,action){
            console.log(action.payload);
            state.deptInfo.deptName = action.payload.deptName;
            state.deptInfo.deptArea = action.payload.deptArea;
            state.deptInfo.deptId = action.payload.deptId;
        }
    }
});

export const {setAppVersion, logout,changeUser,setDeptInfo,setMenus,changeDeptInfo} = loginReducer.actions;
export default loginReducer.reducer;
