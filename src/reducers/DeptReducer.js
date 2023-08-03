import { createSlice } from "@reduxjs/toolkit";

const deptReducer = createSlice({
  name:'dept',
  initialState:{
    deptInfo:{
        deptId:'',
        deptName:'',
        deptArea:''
    }
  },
  reducers:{
    setDeptInfo(state,action){
      state.deptInfo = action.payload;
      state.deptInfo.deptName = action.payload.deptName;
      state.deptInfo.deptArea = action.payload.deptArea;
    },
    looutDept(state,action){
      state.deptInfo.deptId = '';
      state.deptInfo.deptName = '';
      state.deptInfo.deptArea = '';
    }
  },
  extraReducers:{

  }
});

export const { setDeptInfo ,looutDept} = deptReducer.actions
export default deptReducer.reducer;

