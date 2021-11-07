import * as React from 'react';
import { StyleSheet, View ,TouchableOpacity} from 'react-native';
import {useGetStoryByIdQuery } from '../services/hackerNews'
import {Text, Headline, useTheme} from 'react-native-paper'
import {useAppSelector} from '../hooks/useReduxHooks'
import * as WebBrowser from 'expo-web-browser';


interface NewsItemProp{
	item: number;
}


export default function NewsItem({item}) {
	const {colors} = useTheme()
	const isThemeDark = useAppSelector(state => state.theme.isThemeDark);
	const {data, isLoading, error} = useGetStoryByIdQuery(item)
	
	if(isLoading){
		return null;
	}
	
	if(error){
		return <Text>Error Occured</Text>
	}
	 function handleHelpPress(url: string) {
		if(!url) return;
	  WebBrowser.openBrowserAsync(url);
	}
	
	const getTime = (unixString) => {
		return new Date(unixString*1000).getHours()
	}
	
   return (
	<TouchableOpacity style={[styles.container, {backgroundColor:isThemeDark? colors.accent:"white",}]} onPress={()=> handleHelpPress(data.url)}>
		<Text style={{fontSize:14, color:isThemeDark? colors.tint:"#107769", marginBottom:6}}>{data.title}</Text>
		<View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
			<Text style={{color:"black"}}>By {data.by}</Text>
			<Text style={{color:"black"}}>{getTime(data.time)} hours ago</Text>
		</View>
		<View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
			<Text style={{color:"black"}}>{data.score} votes</Text>
			<Text style={{color:"black"}}> {data.descendants} comments</Text>
		</View>
	</TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
	width:"98%",
	padding:15,
	marginVertical:4, 
	marginHorizontal:"auto",
	shadowColor:"rgba(244, 241, 187, 0.59)",
	shadowRadius:4,
	borderRadius: 11,
	}
 
});
