import { StyleSheet } from "react-native";
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from "react";
import { getUrlWithParams, sleep } from "@/utils";
import useAuthStore from "@/store";
import { Colors } from "@/constants/Colors";
import Loading from "@/components/ui/Loading";
import Animated, { FadeIn } from "react-native-reanimated";
import { getLoginParams } from "@/constants/URL";

export default function index() {

  const { setTokens, accessToken, refreshToken, tokenExpirationMiddleware } = useAuthStore((state) => state)
  const local = useLocalSearchParams()

  useEffect(() => {
    initLogin()
  }, [])

  // get access token and stores it, handle success and error redirects
  async function initLogin() {
    try {
      if (local.error) {
        router.navigate({ pathname: '/error', params: { message: 'Error getting param local.code' } })
      } else {
        await tokenExpirationMiddleware(async () => {
          if (!accessToken || !refreshToken) {
            const urlWithParams = getUrlWithParams('https://www.strava.com/oauth/token', getLoginParams(local.code as string))
            let response = await fetch(urlWithParams, { method: 'POST' })
            let { access_token, refresh_token, expires_at, athlete } = await response.json()
            await setTokens(access_token, refresh_token as string, expires_at.toString(), `${athlete.firstname} ${athlete.lastname}`)
          }
          router.replace('/routes/activities')
        })
      }
    } catch (err) {
      router.navigate({ pathname: '/error', params: { message: 'Error on authorization ' } })
    }
  }

  return (
    <Animated.View style={styles.container} entering={FadeIn}>
      <Loading message="Logging in" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  loadText: {
    fontFamily: 'InterMedium',
    fontSize: 20,
    color: Colors.text
  }
})
