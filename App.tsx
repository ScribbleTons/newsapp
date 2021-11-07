import React, {useEffect} from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,

} from "react-native-paper";
import merge from "deepmerge";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { useAppSelector } from "./hooks/useReduxHooks";
import {createTable} from './services/database';
import {usePrefetch} from './services/hackerNews'


declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      tint: string;
    }

  }
}
const customDefaultTheme = {
  ...PaperDefaultTheme,
  roundness: 2,
  colors: {
	...PaperDefaultTheme.colors,
    primary: "#ED6A5A",
    accent: "#F4F1BB",
    background: "#ED6A5A",
    text: "#5D576B",
    placeholder: "#C4C4C4",
    tint: "#ED6A5A",
	
  },
};

const customDarkTheme = {
  ...PaperDarkTheme,
  roundness: 2,
  colors: {
	...PaperDarkTheme.colors,
    primary: "#ED6A5A",
    accent: "#F4F1BB",
    text: "#ffffff",
    placeholder: "#C4C4C4",
    tint: "#ED6A5A",  
	
  },
};

const CombinedDefaultTheme = merge(customDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(customDarkTheme, NavigationDarkTheme);

export default function App() {
	const prefetch = usePrefetch("getTopStories",{force:true});
  const isLoadingComplete = useCachedResources();
  const isThemeDark = useAppSelector(state => state.theme.isThemeDark);
  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

	useEffect(()=>{
		createTable();
		prefetch()
	},[])
  	
  if (!isLoadingComplete) {
    return null;
  } else {
	
    return (
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <Navigation theme={theme} />
          <StatusBar />
        </SafeAreaProvider>
      </PaperProvider> 
    );
  }
}
