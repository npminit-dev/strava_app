import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Cambia la librería de íconos si lo necesitas
import { Colors } from '@/constants/Colors';

type ErrorProps = {
  message:string, 
  buttonText:string,
  onPress?: () => void
}

const Error = ({ message, buttonText, onPress }: ErrorProps) => {
  return (
    <View style={styles.container}>
      <Icon name="error-outline" size={80} color={Colors.emphasis} style={styles.icon} />
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.button} onPress={onPress || undefined}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#D32F2F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Error;
