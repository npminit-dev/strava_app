import { Card, Text } from 'react-native-paper'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'
import { ActivityType } from '@/app/routes/activities';

const Activity = ({ name, distance, elapsed_time, start_date_local, total_elevation_gain }: ActivityType) => {
  return (
    <Card style={styles.card}>
      <Card.Title style={styles.font as StyleProp<ViewStyle>} title={name} />
      <Card.Content>
        <Text variant="bodySmall">
          <Text style={styles.sb}>Date: </Text>
          {start_date_local.replaceAll(/(T|Z)/g, ' ')}
        </Text>
        <Text style={styles.font} variant="bodySmall">
          <Text style={styles.sb}>Distance: </Text>
          {Math.round(distance / 1000)} kms
        </Text>
        <Text style={styles.font} variant="bodySmall">
          <Text style={styles.sb}>Duration: </Text>
          {Math.round(elapsed_time / 60)} minutes
        </Text>
        <Text style={styles.font} variant="bodySmall">
          <Text style={styles.sb}>Elevation gain: </Text>
          {total_elevation_gain} mts
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    fontFamily: 'InterMedium',
    marginVertical: 2
  },

  font: {
    fontFamily: 'InterLight',
  },

  sb : {
    fontWeight: 'semibold'
  }
})

export default Activity;