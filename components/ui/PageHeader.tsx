import { Colors } from "@/constants/Colors";
import { StyleSheet, Text } from "react-native";

type PageHeaderProps = {
  title:string,
  data?:string 
}

const PageHeader = ({ title, data }: PageHeaderProps) => {
  return (
    <Text style={styles.header}>{title}{ data ? ` ${data}` : '' }</Text>
  );
}
 
const styles = StyleSheet.create({
  header: {
    position: 'sticky',
    top: 0,
    fontFamily: 'InterMedium',
    fontSize: 12,
    color: Colors.text,
    backgroundColor: 'none',
    textAlign: 'center',
    paddingVertical: 2
  },
})

export default PageHeader;