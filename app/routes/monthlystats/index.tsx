import { useQuery } from "@tanstack/react-query";
import { StyleSheet, View } from "react-native";
import { endOfDay, format, sub, parse } from 'date-fns'
import { ActivityType } from "../activities";
import { useEffect, useState } from "react";
import useAuthStore from "@/store";
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'
import { Link } from "expo-router";
import MonthlyStats from "@/components/ui/MonthlyStats";
import Animated, { FadeInLeft } from "react-native-reanimated";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import PageHeader from "@/components/ui/PageHeader";
import List from "@/components/ui/List";

export default function index() {
  const today = endOfDay(new Date());
  const threeMonthsAgo = sub(today, { months: 3 });
  const { accessToken, tokenExpirationMiddleware } = useAuthStore(state => state)
  const [months, setMonths] = useState<IIndexable>({})

  // get activities of the past 3 months
  const { data: activities, status, refetch } = useQuery({
    queryKey: ['lastMonthsActivities'],
    queryFn: async () => {
      return await tokenExpirationMiddleware(async () => {
        let response = await fetch(`https://www.strava.com/api/v3/athlete/activities?after=${Math.floor(threeMonthsAgo.getTime()/1000)}&before=${Math.floor(today.getTime()/1000)}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        return response.json()
      })
    }
  })

  // group activities by month
  useEffect(() => {
    if (Array.isArray(activities) && status === 'success') {
      const groupedActivities = {} as IIndexable;
      activities.forEach((activity) => {
        const month = format(new Date(activity.start_date_local), "yyyy-MM");
        if (!groupedActivities[month]) groupedActivities[month] = [];
        groupedActivities[month].push(activity);
      });
      setMonths(groupedActivities);
    }
  }, [activities])

  // generate agreggated data
  const calculateMonthlyStats = (month: string, activities: ActivityType[]) => {
    const monthlyStats: MonthlyActivity = {
      month_name: new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        parse(month, "yyyy-MM", new Date())
      ),
      total_distance: 0,
      total_time: 0,
      total_elevation_gain: 0,
    };
  
    activities.forEach(activity => {
      monthlyStats.total_distance += activity.distance;
      monthlyStats.total_time += activity.elapsed_time;
      monthlyStats.total_elevation_gain += activity.total_elevation_gain;
    });
  
    return monthlyStats;
  };

  return (
    <Animated.View style={styles.container} entering={FadeInLeft}>
      {
        status === 'pending' ? <Loading message="Loading monthly activity"/> :
        status === 'error' ? <Error message="Error while loading monthly activity" buttonText="Retry" onPress={() => refetch()}/> :
          <View style={styles.container}>
            <PageHeader title="Monthly statistics"/>
            <List>
              {
                Object.entries(months).map(([month, activities]) => {
                  const stats = calculateMonthlyStats(month, activities);
                  return (
                    <Link
                      key={uuid()}
                      href={`/routes/monthlystats/MonthDetails?activities=${JSON.stringify(activities)}&month=${stats.month_name}`}
                    >
                      <MonthlyStats {...stats} />
                    </Link>
                  );
                })
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

  list: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 2,
  }
})

export type MonthlyActivity = {
  month_name: string
  total_distance: number
  total_time: number
  total_elevation_gain: number
}

export interface IIndexable {
  [key: string]: any;
}