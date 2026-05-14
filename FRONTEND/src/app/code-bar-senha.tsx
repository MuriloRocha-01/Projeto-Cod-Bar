import { View, Text, TextInput, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useCodbar } from '@/context/CodbarContext';
import { useState } from 'react';
import { router } from 'expo-router';
import { useSenha } from '@/hooks/senha.hook';
import { useTabela } from '@/hooks/tabela.hook';


function Code_bar_Senha() {
  const { getOperador } = useSenha();
  const { getTabela, getNome } = useTabela();

  const params = useLocalSearchParams();
  const valornumpcf = params.code as string;
  const codBar = params.codBar as string;

  const [loading, setLoading] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const { SaveContext } = useCodbar();

  const handleConfirm = (password:string) => {
    if (!password) {
      Alert.alert('É necessario que você digite a senha ');
      return;
    } else {
      setLoading(true);
      getOperador(password)
        .then((response) => {
          if (!response) {
            Alert.alert('Senha incorreta, tente novamente');
            return;
          }
          //numpcf estou pegando do SELECT da tabela, e a posicao estou pegando do codigo de barras
          const numpcf = Number(valornumpcf);
          const posicao = Number(codBar.slice(-2));
          SaveContext(codBar, password, numpcf, posicao);

          //Pegar a tabela e redirecionar para a tela de tabela
          montandoTabela(numpcf, response);
        })
        .catch((error) => {
          Alert.alert('Operador não encontrado, tente novamente', error.message);
          return;
        }).finally(()=>{
          setTimeout(() => {
          setLoading(false); // Desativa o loading
          }, 2000);
        });
    }
  };

function montandoTabela(numpcf: number, response: any) {
    getTabela(numpcf)
      .then((tabela) => {
        if (!tabela || tabela.length === 0) {
          Alert.alert('Erro', 'Nenhuma etapa encontrada no banco para este código.');
          setLoading(false);
          return;
        }
        // CHAMA O NOME DO PRODUTO E RETORNA A PROMISSE
        return getNome(numpcf).then((produtoResponse) => {
          const nomeProduto = produtoResponse?.nompro?.trim() || 'Não identificado';
          const nomeOperador = response?.operador?.trim() || 'Operador não identificado';
          router.push({
            pathname: '/tabela-code',
            params: {
              nomeOperador: nomeOperador,
              nomeProduto: nomeProduto,
              tabelaInicial: JSON.stringify(tabela)
            },
          });
        });
      })
      .catch((error) => {
        Alert.alert('Erro', 'Falha ao carregar dados: ' + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <View className="h-full w-full items-center justify-center gap-6 bg-[#F5F5F7]">
      <Text className="text-bold text-center text-xl text-[#414141]">Digite sua senha: </Text>

      <TextInput
        className="h-12 w-52 rounded-xl bg-white text-center text-[1.1rem] drop-shadow-lg"
        placeholder="XXX-XXX-XX"
        placeholderTextColor="#414141"
        secureTextEntry={true}
        keyboardType="numeric"
        value={passwordInput}
        onChangeText={(text)=>{
          const apenasNumeros = text.replace(/[^0-9]/g, '');
          setPasswordInput(apenasNumeros);
          if(apenasNumeros.length === 4){
            handleConfirm(apenasNumeros)
          }
        }}
      />

      <Text>Codigo de barras : {codBar} </Text>

      <Modal visible={loading} transparent={true} animationType="fade" statusBarTranslucent={true}>
        <View className="flex-1 items-center justify-center bg-white">
          <ActivityIndicator size="large" color="#000" />
        </View>
      </Modal>
    </View>
  );
}

export default Code_bar_Senha;
