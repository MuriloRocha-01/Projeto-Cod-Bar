import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useEffect, useState} from 'react';
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

  const [numpcf, setNumPcf] = useState(0);
  const [codBar, setCodBar] = useState(0);


  useEffect(() => {
    if (permission?.granted) {
      setModalIsVisible(true);
    }else{
      setModalIsVisible(false);
    }
  }, [permission]); // Sempre que o status da permissão mudar, ele verifica se deve abrir o modal
  // Pegamos a largura e altura da tela para calcular o centro
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const handleScan = ({ data, bounds }: BarcodeScanningResult) => {
    if (!data ) return;

    const { origin, size } = bounds;

    const barcodeCenterX = origin.x + size.width / 2;
    const barcodeCenterY = origin.y + size.height / 2;

    const scanAreaHeight = 200;
    const scanAreaWidth = 300;

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


      setModalIsVisible(false);
      setLoading(true);

      getCodBar(data).then((response) => {
        if (!response) {
        Alert.alert('Erro', 'Código não encontrado');
        return;
      }

      setNumPcf(response?.numpcf);
      setCodBar(Number(data));
      const pcfDireto = response?.numpcf;
      const codBarDireto = data;

      setTimeout(() => {
      setLoading(false); // Desativa o loading
      }, 3000);
          router.push({
                pathname: '/code-bar-senha',
                params: { code: pcfDireto, codBar: codBarDireto },
              })
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
      <Modal visible={modalIsVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <CameraView
            facing="back"
            style={StyleSheet.absoluteFill}
            onBarcodeScanned={handleScan}
          />

          <View style={StyleSheet.absoluteFill}>
            <View className="flex-1 items-center justify-end bg-[rgba(0,0,0,0.6)] pb-4">
              <Text className="font-bold text-lg text-white">Posicione o código de barras</Text>
            </View>

            <View className="h-[20%] flex-row">
              <View className="flex-1 bg-[rgba(0,0,0,0.6)]" />

              <View className="w-[80%] bg-transparent" />
              <View className="flex-1 bg-[rgba(0,0,0,0.6)]" />
            </View>

            <View className="flex-1 items-center justify-center bg-[rgba(0,0,0,0.6)]">
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Index;
