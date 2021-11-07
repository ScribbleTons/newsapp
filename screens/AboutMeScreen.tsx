import * as React from 'react';
import {  View, StyleSheet, Image, ScrollView } from 'react-native';
import {Text,Avatar, useTheme, Headline, Paragraph} from 'react-native-paper';


export default function TabTwoScreen() {
	const {colors} = useTheme();
  return (
    <View style={styles.container}>
		<ProfileCard colors={colors} />
		<Content />
    </View>
  );
}




const ImageComp = ({colors}) => <View style={[styles.imgCon,{backgroundColor: colors.tint,}]}>
      <Image source={require("../assets/images/emmanuel.png")} style={styles.img}/>
    </View> 

const ProfileCard = ({colors}) => (<View style={styles.profile}>
	<ImageComp colors={colors} />
	 <View style={{flex:.6, width:"100%", height:100, paddingHorizontal:10, marginTop:-10}}>
	  <Headline style={[styles.profileHeadline, {color: colors.tint}]}>Name:</Headline>
	  <Text style={styles.profileText}>Ugwuoke Emmanuel</Text>
	  <Headline style={[styles.profileHeadline, {color: colors.tint}]}>Email:</Headline>
	  <Text style={styles.profileText}>ugwuokeemmanuel125@gmail.com</Text>
	 </View>
	</View>)

const Content = () => <ScrollView
		showsVerticalScrollIndicator={false}
		style={styles.scrollView}
		>
			<Paragraph style={styles.para}>
			Let me tell you a story.  There’s this lad, when he was 17 years old and was planning for his WAEC exams, the next year. This lad was confused with picking a course in school.
			</Paragraph>
			<Paragraph  style={styles.para}>
			 He spends most of his afternoon on his tiny phone surfing wikihow.com and would always ask how the webpage worked. He was naturally drawn to computer. Amdist his confusion, he dreamt of html tags.
			</Paragraph>
			<Paragraph  style={styles.para}>
			He found out they were html tags 3 years later. From the moment he had that dream, he wanted to become a software engineer.
			</Paragraph>
			<Paragraph  style={styles.para}>
			He followed the possible route, Electronic Engineering with major in microprocessor design and computer system design.
			</Paragraph>
			<Paragraph  style={styles.para}>
			I am that lad. Today, I have taught myself how to build a website and app partly because I am passionate about software engineering, moreso because I'd like to solve problem with my skills.
			</Paragraph>
			<Paragraph  style={styles.para}>
			I started with Java (lol, I didn't even know what I was doing then), took an academic course in C++, taugh myself Python and did a little bit of machine learning (my system couldn't perform the tasks), and took on Coursera, a 5 module course on Project Management. I knew I needed to learn the hard skill, then I taught myself PHP, Laravel, and Vue.js. Worked on one gig.
			</Paragraph>
			<Paragraph  style={styles.para}>
			I wanted to build a website for myself and a programming language that could do just about anything I wanted. That is how I focused on JavaScript. I taught myself React and learnt it working on a job, just as I did with React-Native.
			</Paragraph>
			<Paragraph  style={styles.para}>
			Ever since then, I have done projects in my spare time with node.js and most recently Etheruem smart contract development while working on contract works.
			</Paragraph>
		</ScrollView>
	
	
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop:10,
  },
   imgCon: {
   height: 110,
	width: 120,
	flex:.3,
	justifyContent:"center",
	alignItems:"center"
	
  },
  img: {
  position:"relative",
  height:"100%",
  width: "80%",
	margin:"auto"
  },
  profile: {
	flexDirection:"row",
	justifyContent:"space-between",
	alignItems:"flex-start",
	height:100,
  },
  profileHeadline:{
  fontSize:16,
  padding:1,
  height:25,
  },
   profileHeadText:{
	  fontSize:14,
	  padding:1,
	  margin:0,
  },
  scrollView:{
  paddingHorizontal:20,
  height:"80%",
  marginTop:30,
  },
  para:{
  textAlign:"justify",
  fontSize:16,
  marginBottom:8,
  }
});
