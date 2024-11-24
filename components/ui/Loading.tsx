import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign'; // Puedes usar otra librería de íconos si prefieres
import { Colors } from '@/constants/Colors';

const Loading = ({ message }: { message:string }) => {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 750, easing: Easing.linear }),
      -1, 
      false
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        <Icon name="loading2" size={50} color={ Colors.emphasis } />
      </Animated.View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  iconContainer: {
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});

export default Loading;
