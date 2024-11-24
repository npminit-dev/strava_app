import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import Error from "@/components/ui/Error";

const index = () => {

  const params = useLocalSearchParams()

  return (
    <View style={styles.container}>
      <Error 
        message={params.message as string} 
        buttonText={'Dismiss'}
        onPress={() => router.replace('/')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
 
export default index;