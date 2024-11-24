import { useFonts } from 'expo-font';
import { router, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {   QueryClient,
  QueryClientProvider, } from '@tanstack/react-query'
import { SafeAreaView, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import useAuthStore from '@/store';
SplashScreen.preventAutoHideAsync();

const client = new QueryClient()

export default function layout() {

  const { loadTokens } = useAuthStore(state => state)
  const [loaded] = useFonts({
    InterMedium: require('../assets/fonts/Inter_18pt-Medium.ttf'),
    InterMediumItalic: require('../assets/fonts/Inter_18pt-MediumItalic.ttf'),
    InterLight: require('../assets/fonts/Inter_18pt-Light.ttf'),
    InterLighItalic: require('../assets/fonts/Inter_18pt-LightItalic.ttf'),
    InterSemiBold: require('../assets/fonts/Inter_18pt-SemiBold.ttf'),
    InterSemiBoldItalic: require('../assets/fonts/Inter_18pt-SemiBoldItalic.ttf'),
  });

  useEffect(() => {
    handleAppStart()
  }, [loaded]);

  // load fonts, and check if a token is storaged and redirects if exists
  const handleAppStart = async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
      await loadTokens()
      const { accessToken, refreshToken } = useAuthStore.getState();
      if(accessToken && refreshToken) router.replace('/routes/activities')
    }
  }

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={client}>
      <SafeAreaView style={styles.mainContainer}> 
        <Slot/> 
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
  }
})
