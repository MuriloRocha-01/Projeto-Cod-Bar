import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useEffect, useState } from 'react';
import { useCodBar } from '@/hooks/codBar.hook';
import { Alert, View, Text, StyleSheet, Modal, Button, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import BarcodeMask from 'react-native-barcode-mask';
import ModalCarregamento from '@/components/modalCarregamento/ModalCarregamento';

function Index() {
  const { getCodBar } = useCodBar();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const { width, height } = useWindowDimensions();

  
  // Define se é tablet baseado na largura da tela (geralmente > 600)
  const isTablet = width > 600;

  const maskWidth = isTablet ? 800 : 300;
  const maskHeight = isTablet ? 200 : 120;
  useEffect(() => {
    if (permission?.granted) {
      setModalIsVisible(true);
    } else {
      setModalIsVisible(false);
    }
  }, [permission]);


  const handleScan = ({ data}: BarcodeScanningResult) => {
  if (isScanning || !data) return;

  setIsScanning(true);
  setModalIsVisible(false); 
  setLoading(true);

  getCodBar(data)
    .then((response) => {
      setLoading(false);
      if (!response) {
        setTimeout(() => {
          Alert.alert('Aviso', 'Código de barras não encontrado no sistema.', [
            { text: 'OK', onPress: () => {
                setIsScanning(false); 
                setModalIsVisible(true); 
            }},
          ]);
        }, 800);
        return;
      }

      // Se achou, vai para a próxima tela
      router.push({
        pathname: '/code-bar-senha',
        params: { code: response.numpcf, codBar: data },
      });
    })
    .catch((error) => {
      setLoading(false);
      setTimeout(() => {
        Alert.alert('Erro', 'Falha na conexão.', [
          { text: 'Tentar novamente', onPress: () => {
              setIsScanning(false);
              setModalIsVisible(true);
          }},
        ]);
      }, 500);
    });
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
    
    <View className="flex-1">
      {loading ? (
              <ModalCarregamento/>
            ) : 
      <View>
      <Modal visible={modalIsVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <CameraView facing="back" style={{ flex: 1 }} onBarcodeScanned={handleScan} />
          <BarcodeMask width={maskWidth} height={maskHeight} edgeColor={'#535353'} showAnimatedLine={false} outerMaskOpacity={0.8} />
        </View>
      </Modal>
    </View>
    }
    </View>
  );
}

export default Index;
