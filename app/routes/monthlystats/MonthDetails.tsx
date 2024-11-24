import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ActivityType } from "../activities";
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'
import Activity from "@/components/ui/Activity";
import Animated, { FadeInRight } from "react-native-reanimated";
import PageHeader from "@/components/ui/PageHeader";
import List from "@/components/ui/List";

const MonthDetails = () => {
  // month activities are received via params
  const params = useLocalSearchParams()

  return (
    <Animated.View style={styles.container} entering={FadeInRight}>
      {
        params ?
          <View style={styles.container}>
            <PageHeader title="Activity in" data={params.month as string}/>
            <List>
            {
              JSON.parse(params.activities as string).map((activity: ActivityType) =>
                <Activity key={uuid()} {...activity} />
              )
            }
            </List>
          </View> : <></>
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

export default MonthDetails;