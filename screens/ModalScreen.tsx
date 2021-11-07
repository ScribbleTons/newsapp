import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet , View } from 'react-native';
import {Text, Paragraph} from "react-native-paper";



export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Case Afterthought</Text>
      <View style={styles.separator} />
	  <MyThought />
    </View>
  );
}

const MyThought = () => <View style={styles.thought}>
 <Paragraph style={styles.para}>
	  I hope I was able to develop this app just according to the specification.
	  </Paragraph>
	   <Paragraph style={styles.para}>
	  I am always risking my laptop whenever I use it for app development.
	  It takes serveral minutes to compile and my laptop crashes most time. 
	   </Paragraph>
	    <Paragraph style={styles.para}>
	  For this current case, I had one blue screen of death event and restarted my computer multiple times. That is why I am delivering this now.
	    </Paragraph>
	  <Paragraph style={styles.para}>
	  For instance, my Vs Code crashed multiple times while working on this app and it is no longer working, even after redownloading it (I will work that out later).
	    </Paragraph>
	   <Paragraph style={styles.para}>
	  I basically worked on this app using notepad++, it's okay to use and lightweight compare to most IDEs.
	    </Paragraph>
	  <Paragraph style={styles.para}>
	  I pray you don't notice this from the texts and syntax formats, lol.
	   </Paragraph>
	  <Paragraph style={styles.para}>
	  Should I make it through the rounds, please I would need a new laptop that is suitable for this kind of work for better productivity.
	    </Paragraph>
	   <Paragraph style={styles.para}>
	  Thank you!!
	  </Paragraph>
</View>;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  para:{
  textAlign:"justify",
  fontSize:16,
  marginBottom:8,
  },
  thought:{
	padding:20,
  }
});
