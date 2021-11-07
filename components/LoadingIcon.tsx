import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

const LoadingIcon = () => {
	const theme = useTheme();
	return (
		<View style={styles.container}>
			<ActivityIndicator animating={true} color={theme.colors.tint} />
		</View>
	)
}

export default LoadingIcon;

const styles = StyleSheet.create({
	container: {
		justifyContent:"center", 
		alignItems:"center", 
		padding:15, 
		height:"100%", 
		width:"100%",
	}
})