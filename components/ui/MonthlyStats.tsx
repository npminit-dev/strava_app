import { MonthlyActivity } from "@/app/routes/monthlystats";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Card, Text } from "react-native-paper";

const MonthlyStats = ({ month_name, total_distance, total_elevation_gain, total_time }: MonthlyActivity) => {
  return (
    <Card style={{ width: '100%', marginVertical: 2 }}>
      <Card.Title style={styles.font as StyleProp<ViewStyle>} title={month_name}/>
      <Card.Content>
        <Text variant="bodySmall">
          <Text style={styles.sb}>Total distance: </Text>
          { Math.round(total_distance/1000) } kms
        </Text>
        <Text variant="bodySmall">
          <Text style={styles.sb}>Total elevation gain: </Text>
          { total_elevation_gain } mts
        </Text>
        <Text variant="bodySmall">
          <Text style={styles.sb}>Total time: </Text>
          { Math.round(total_time/60) } minutes
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'InterLight'
  },
  sb: {
    fontWeight: 'semibold'
  }
})
 
export default MonthlyStats;