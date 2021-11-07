import React, { FC, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Headline, Text, useTheme, Avatar, TextInput, Button } from "react-native-paper";
import {login, setUser} from '../features/auth/authSlice'
import { useAppDispatch } from "./../hooks/useReduxHooks";

interface RegisterProps {navigation:any}
const LoginScreen: FC<RegisterProps> = ({navigation}) => {
	const [email, setEmail] = useState<{email:string}>();
	const [password, setPassword] = useState<{password:string}>();
	const [isLoading, setLoading] = useState<boolean>(false)
	const {colors} = useTheme();
	const dispatch = useAppDispatch();
	
	const payload = {email, password};
	
	const loginUser = ()=>{
	setLoading(true)
	try{
		if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(payload.email) || payload.password.lenght < 5){
			Alert.alert("Please enter valid inputs");
			return;
		}
		
		login(payload).then((data)=>{
			setLoading(false) 
			if(typeof data === "boolean" && data){
				dispatch(setUser(payload))
				navigation.navigate("Root")
				return;
			}else if(data.passwordError){
			 Alert.alert("Password error. Try again")
			 } else{
			 Alert.alert("User doesn't exist. Please Register.")
			}
			
		}).catch(console.error);

	}
	catch(error){console.error(error)}	
	
	}
	
	
  return (
    <View style={[styles.container, {backgroundColor: colors.accent}]}>
      <View style={{display:"flex"}}>
        <View style={{display:"flex", alignItems:"center"}}>
        <Avatar.Image size={70} source={require("../assets/images/adaptive-icon.png")} style={{backgroundColor:colors.accent}} />
          <Headline style={{color:colors.tint, marginBottom:8, marginTop:2}}>Welcome to Newsbull</Headline>
        </View>
        <View style={{marginHorizontal:15, display:"flex" }}>
          <Headline style={{color:"black", marginBottom:2, marginTop:4, fontSize:14, textAlign:"center"}}>
            Login to continue or <Text style={{color:"blue", textDecorationLine:"underline"}} onPress={()=>navigation.navigate("Register")}>Register</Text>
          </Headline>
	  	<TextInput 
		mode="outlined" 
		label="Email" 
		placeholder="Enter email" 
		value={email} 
		onChangeText={setEmail} 
		activeOutlineColor={colors.tint}
		outlineColor={colors.text}
		style={{marginBottom:8}}
		selectionColor={colors.tint}
		keyboardType="email-address"
		autoCompleteType="email"
		/>

	  	<TextInput 
		mode="outlined" 
		label="Password" 
		placeholder="Enter password" 
		value={password} 
		onChangeText={setPassword} 
		activeOutlineColor={colors.tint}
		outlineColor={colors.text}
		style={{marginBottom:8}}
		keyboardType="default"
		autoCompleteType="password"
		/>
		<TouchableOpacity onPress={loginUser}>
		<Button 
		mode="contained"
        loading={isLoading}		
		style={{
		   backgroundColor: colors.tint, 
 		   width:"50%", 
		   alignSelf:"center", 
           marginTop:10
		}} 
		>
		Log in
		</Button>
		</TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal:10, display:"flex", justifyContent:"center"},
  input:{
	borderRadius:25,
	borderWidth:1,
	}
});
export default LoginScreen;
