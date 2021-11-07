import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import {fetchUser,logOutUser} from '../../services/database';
import { useAppDispatch } from "./../hooks/useReduxHooks";

interface authState {
    isAuthenticated: boolean;
	user:{email?:string; 
			password?:string;
			name?: string;
		},
}
interface Registeration{
	email:string;
	password: string;
}


const initialState: authState = {
   isAuthenticated: false,
   user:{
	email:"",
	password: "",
	name: ""
	}
}

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
	setUser: (state,action:PayloadAction<Registeration>) => {
		const {email, password} = action.payload;
		state.user.email = email;
		state.user.password = password;
		state.isAuthenticated = email?true:false;
	},
	logout: (state) => {
		state.user = null;
		state.isAuthenticated = false;
		}
    },
})

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions

 export const login = (payload) => {
	return new Promise((resolve, reject) => {
		try{
			fetchUser().then(res =>{
			 if(res?.length <= 0){ 
			   resolve(res)
				return;
			 };
			  const user = res.find(urs => urs.email == payload.email);
			  if(user.password === payload.password){
				resolve(true)
				return;
			  }else if(user.password != payload.password){
				resolve({passwordError: true})
				return;
			  }
			  resolve(false);
			})
		 
		}
		catch(err){
			reject(err)
		}
	});
 }
 
export function logOut(payload){
	return new  Promise((resolve, reject) => {
	try{
		logOutUser(payload).then((res)=>{
		if(res.rowsAffected != 0){
			resolve(true)
		}else{
			resolve(false)
		}		
	})
		
	}catch(err){reject(err)}
	});
}

export default authSlice.reducer