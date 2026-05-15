import { ActivityIndicator, Modal, View } from 'react-native';



export default function ModalCarregamento() {
  return (
    <Modal transparent={true} animationType="fade" statusBarTranslucent={true}>
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    </Modal>
  );
}
