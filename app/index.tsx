import { StyleSheet } from "react-native";
import * as React from 'react'
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";

const scope = encodeURIComponent("activity:read_all");
const redirectUri = encodeURIComponent("rntest://login");

export default function index() {
  return (
    <Animated.View style={styles.container} entering={FadeIn}>
      <Animated.Image entering={FadeInUp} style={styles.image} source={require('../assets/images/strava-logo.png')}/>
      <Animated.Text entering={FadeIn} style={styles.title}>STRAVA</Animated.Text>
      <Link style={styles.link} href={`https://www.strava.com/oauth/mobile/authorize?client_id=140827&redirect_uri=${redirectUri}&response_type=code&approval_prompt=auto&scope=${scope}`}>LOGIN</Link>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  link: {
    fontFamily: 'InterMedium',
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: Colors.emphasis,
    color: Colors.primary,
    borderRadius: 5,
    marginTop: 20
  },

  image: {
    height: 150,
    width: 150
  },

  title: {
    fontSize: 30,
    fontFamily: 'InterMedium',
    color: Colors.text
  }
})