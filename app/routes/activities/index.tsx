import useAuthStore from "@/store";
import { useQuery } from "@tanstack/react-query";
import { BackHandler, StyleSheet, View } from "react-native";
import "react-native-get-random-values";
import { v4 as uuid } from 'uuid'
import Activity from "@/components/ui/Activity";
import Animated, { FadeInLeft } from "react-native-reanimated";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useEffect } from "react";
import PageHeader from "@/components/ui/PageHeader";
import List from "@/components/ui/List";

const index = () => {

  const { accessToken, tokenExpirationMiddleware } = useAuthStore(state => state)
  const { data: activities, status, refetch } = useQuery({
    queryKey: ['getActivities'],
    queryFn: async () => {
      return await tokenExpirationMiddleware(async () => {
        let res = await fetch('https://www.strava.com/api/v3/athlete/activities', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        })
        return res.json() 
      })
    },
    enabled: true,
  })

  // prevent back to root when user is logged
  useEffect(() => {
    const backHandler = () => {
      if(accessToken) {
        BackHandler.exitApp()
        return true
      }
      return false
    }
    BackHandler.addEventListener('hardwareBackPress', backHandler)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler)
    }
  }, [])

  return (
    <Animated.View style={styles.container} entering={FadeInLeft}>
    { status === 'pending' ? <Loading message="Loading activities"/> :
      status === 'error' ? <Error message="Error while loading activities" buttonText="Retry" onPress={() => refetch()}/> :
      <View style={styles.container}>
        <PageHeader title="Activities"/>
        <List>
        {
          Array.isArray(activities) ? activities.map((activity: ActivityType) => {
            return (
              <Activity 
                key={uuid()}
                {...activity}
              />
            )
          }) : null
        }
        </List>
      </View>
    }
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  font: {
    fontFamily: 'InterLight',
  },

  sb : {
    fontWeight: 'semibold'
  },

  list: {
    paddingVertical: 5,
    paddingHorizontal: 2,
  }
})

export type ActivityType = {
  name:string
  start_date_local:string
  distance:number
  elapsed_time:number
  total_elevation_gain:number
}
 
export default index;