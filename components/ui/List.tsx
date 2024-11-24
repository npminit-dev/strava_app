import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet } from "react-native";

const List = ({ children }: PropsWithChildren) => {
  return (
    <ScrollView style={styles.list}>
    {
      children
    }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
})
 
export default List;