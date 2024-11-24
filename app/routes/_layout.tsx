import { Colors } from "@/constants/Colors";
import { Link, router, Slot } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BottomNavigation, BottomNavigationProps, BottomNavigationRoute } from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign';
import useAuthStore from "@/store";
import ConfirmModal from "@/components/ui/ConfirmModal";

const layout = () => {

  const { clearTokens, athleteName } = useAuthStore()
  const [logoutModal, setLogooutModal] = useState(false)

  const handleLogout = async () => {
    await clearTokens()
    router.replace('/')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.athleteName}>{ athleteName }</Text>
      <Slot/>
      <View style={styles.navigation}>
        <Link style={styles.link} href={'/routes/activities'} asChild>
          <Pressable>
            <Icon name="bicycle" size={30} color={Colors.primary}/>
            <Text style={styles.linkText}>Activities</Text>
          </Pressable>
        </Link>
        <Link style={styles.link} href={'/routes/monthlystats'} asChild>
          <Pressable>
            <MCIcon name="calendar-month" size={30} color={Colors.primary}/>
            <Text style={styles.linkText}>Monthly stats</Text>
          </Pressable>
        </Link>        
        <Pressable onPress={() => setLogooutModal(true)} style={styles.link}>
          <ADIcon name="logout" size={30} color={Colors.primary}/>
          <Text style={styles.linkText}>Log out</Text>
        </Pressable>
      </View>
      <ConfirmModal 
        isOpened={logoutModal} 
        message="You are about to log out of this user, you will have to log in again, are you sure?"
        onConfirm={handleLogout}
        onCancel={() => setLogooutModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },

  navigation: {
    height: 60,
    width: '100%',
    display: 'flex',
    position: 'sticky',
    bottom: 0,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.emphasis
  },

  link: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap'
  },

  linkText: {
    fontFamily: 'InterMedium',
    fontSize: 12,
    color: Colors.primary
  },

  athleteName: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    color: Colors.primary,
    backgroundColor: Colors.emphasis,
    paddingVertical: 2,
    textAlign: 'center'
  }

})
 
export default layout;