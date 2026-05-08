import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useState, useRef } from 'react';
import { useCodBar } from '@/hooks/codBar.hook';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

function Index() {
  const { getCodBar } = useCodBar();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const codBar = useRef(false);

  // Pegamos a largura e altura da tela para calcular o centro
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const handleScan = ({ type, data, bounds }: BarcodeScanningResult) => {
    if (!data || codBar.current) return;

    const { origin, size } = bounds;

    const barcodeCenterX = origin.x + size.width / 2;
    const barcodeCenterY = origin.y + size.height / 2;

    const scanAreaHeight = 208;
    const scanAreaWidth = screenWidth * 0.8;

    const minX = (screenWidth - scanAreaWidth) / 2;
    const maxX = minX + scanAreaWidth;
    const minY = (screenHeight - scanAreaHeight) / 2;
    const maxY = minY + scanAreaHeight;

    if (
      barcodeCenterX > minX &&
      barcodeCenterX < maxX &&
      barcodeCenterY > minY &&
      barcodeCenterY < maxY
    ) {


      setLoading(false);
      setModalIsVisible(false);
      setLoading(true);
      codBar.current = true;

      getCodBar(data).then((response) => {
        if (!response) {
        Alert.alert('Erro', 'Código não encontrado');
        codBar.current = false; // Importante resetar aqui se falhar
        return;
      }

      const numpcf = response?.numpcf;
          Alert.alert('Sucesso', `Código Confirmado! ${codBar} `, [
          {
            onPress: () => {
              codBar.current = false;
              router.push({
                pathname: '/code-bar-senha',
                params: { code: numpcf, codBar: data }, // Passa o código como parâmetro para a próxima tela
              });
            },
          },
        ]);
      });
    }
  };

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();
      if (!granted) {
        return Alert.alert('Câmera', 'Você precisa habilitar o uso da câmera');
      }
      setModalIsVisible(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (!permission?.granted) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="mb-5">É necessário a permissão da câmera para a leitura.</Text>
        <Button onPress={handleOpenCamera} title="Clique aqui para permitir" color="#F87E2C" />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="mb-5">Permissão para acessar leitor </Text>
      <TouchableOpacity
        onPress={() => setModalIsVisible(true)}
        className="rounded-lg bg-primary px-5 py-3">
        <Text className="text-center font-bold text-white">Abrir Leitor</Text>
      </TouchableOpacity>

      <Modal visible={modalIsVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <CameraView
            facing="back"
            style={StyleSheet.absoluteFill}
            onBarcodeScanned={handleScan}
          />

          <View style={StyleSheet.absoluteFill}>
            <View className="flex-1 items-center justify-end bg-[rgba(0,0,0,0.6)] pb-4">
              <Text className="font-semibold text-lg text-white">Leia o código de barras</Text>
            </View>

            <View className="h-52 flex-row">
              <View className="flex-1 bg-[rgba(0,0,0,0.6)]" />

              <View className="w-[80%] bg-transparent" />
              <View className="flex-1 bg-[rgba(0,0,0,0.6)]" />
            </View>

            <View className="flex-1 items-center justify-center bg-[rgba(0,0,0,0.6)]">
              <TouchableOpacity
                onPress={() => setModalIsVisible(false)}
                className="rounded-lg bg-primary px-5 py-3">
                <Text className="text-center font-bold text-white">Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Index;
