import * as React from 'react';
import { StyleSheet, View ,FlatList, ToastAndroid, Dimensions} from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { RootTabScreenProps } from '../types';
import {useGetTopStoriesQuery} from '../services/hackerNews'
import {Text} from 'react-native-paper'
import NewsItem from '../components/NewsItem';
import LoadingIcon from '../components/LoadingIcon';
import {useAppDispatch, useAppSelector} from '../hooks/useReduxHooks';


export default  function NewsScreen({ navigation }: RootTabScreenProps<'News'>) {
	const {data, isLoading, isSuccess,error, isFetching, refetch} =  useGetTopStoriesQuery({
    pollingInterval: 5000,
  });
	
	const dispatch = useAppDispatch()
	if(isLoading){
		return <LoadingIcon />
	}
	
	if(error){
		ToastAndroid.show("Error occured", ToastAndroid.SHORT)
		return;
	}
	
	const _renderItem = ({item}) =>  <NewsItem item={item} />;
	
	
	
   return (
    <View style={styles.container}>
	<FlatList
		contentContainerStyle={styles.contentContainer}
		style={styles.flatList}
		onRefresh={refetch}
		refreshing={isFetching}
		showsVerticalScrollIndicator={false}
		data={data} 
		renderItem={_renderItem}
		keyExtractor={(item, index) => index.toString()}	
		
	/>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
   paddingLeft:8,
   justifyContent:"center",
   alignItems:"stretch"
   
   
  },
  flatList: {
  marginTop:6,
   width:"99%",
   height: "96%",
   marginHorizontal:"auto"
   
  },
  contentContainer: {
    display:"flex",
    justifyContent:"center",
	alignItems:"stretch"
  },
});
