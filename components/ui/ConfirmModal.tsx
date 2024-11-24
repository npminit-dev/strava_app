import { Colors } from "@/constants/Colors";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type ConfirmModalProps = {
  isOpened: boolean,
  message:string,
  onConfirm: () => void,
  onCancel: () => void
}

const ConfirmModal = ({ isOpened, message, onConfirm, onCancel }: ConfirmModalProps) => {
  return (
    <Modal animationType="fade" visible={isOpened} transparent onRequestClose={onCancel}>
      <Pressable style={styles.shadowBox} onPress={onCancel}>
        <View style={styles.modalContainer}>
          <Icon name="exit-run" size={80} color={Colors.text} style={styles.icon}/>
          <Text style={styles.message}>{ message }</Text>
          <View style={styles.buttonsBox}>
            <Pressable style={{...styles.button, ...styles.confirmButton}} onPress={onConfirm}>
              <Text style={{...styles.buttonText, color: Colors.primary}}>Confirm</Text>
            </Pressable>
            <Pressable style={{...styles.button, ...styles.cancelButton}} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({

  shadowBox: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  modalContainer: {
    maxWidth: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 24,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderColor: Colors.text,
  },

  icon: {
    marginBottom: 24,
  },

  message: {
    fontFamily: 'InterLight',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 24,
    textAlign: 'center'
  },

  buttonsBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    fontFamily: 'InterMedium',
    fontSize: 32, 
  },

  confirmButton: {
    color: Colors.primary,
    backgroundColor: Colors.emphasis
  },

  cancelButton: {
    backgroundColor: Colors.secondary,
    color: Colors.text
  },

  buttonText: {
    fontFamily: 'InterMedium',
    fontSize: 16, 
  }
})
 
export default ConfirmModal;