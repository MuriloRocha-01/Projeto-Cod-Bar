import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Modal,
  Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useCodbar } from '@/context/CodbarContext';
import Slider from '@/components/tabela-code/Slider';
import { ItemTabela } from '@/data/SliderData';
import { useChangeEtapa } from '@/hooks/button.hook';
import { useTabela } from '@/hooks/tabela.hook';
import * as ScreenOrientation from 'expo-screen-orientation';

//material Icon Expo
import Entypo from '@expo/vector-icons/Entypo'; //iniciar
import AntDesign from '@expo/vector-icons/AntDesign'; //pausar
import Fontisto from '@expo/vector-icons/Fontisto'; //retomar
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'; //finalizar

function Tabela_Code() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { getTabela } = useTabela();
  const { postIniciar, postFinalizar, postPausar, postRetomar, postPularEtapa } = useChangeEtapa();
  const params = useLocalSearchParams();
  const nomeOperador = params.nomeOperador as string;
  const nomeProduto = params.nomeProduto as string;
  const tabelaInicialString = params.tabelaInicial as string;

  const etapasIniciais = tabelaInicialString ? JSON.parse(tabelaInicialString) : [];
  const { codBar, senha, numpcf, posicao, limparContext } = useCodbar();
  const [modalPausaVisible, setModalPausaVisible] = useState(false);
  const [infoTabela, setInfoTabela] = useState<ItemTabela[]>(etapasIniciais);
  const [atualizar, setAtualizar] = useState(0);
  

  const primeiroItem = infoTabela[0];
  const etapaAtual = infoTabela.find((item) => item.posicao === posicao) || primeiroItem;


  const situacao = etapaAtual?.situac.trim();

  const botaoDesativadoInciar = ['FINALIZADA', 'EM PRODUÇÃO', 'PULADA'].includes(situacao);
  const botaoDesativadoPausar = !['EM PRODUÇÃO'].includes(situacao);
  const botaoDesativadoRetomar = !['PAUSADA'].includes(situacao);
  const botaoDesativadoPularEtapa = ['FINALIZADA', 'CANCELADA', 'PULADA'].includes(situacao);
  const botaoDesativadoFinalizar = !['EM PRODUÇÃO'].includes(situacao);

  useEffect(() => {
    if (numpcf) {
      getTabela(numpcf)
        .then((dados) => {
          setInfoTabela(dados);
        })
        .catch((err) => console.error('Erro ao carregar tabela', err));
    }
  }, [numpcf, atualizar]);

  if (!infoTabela || infoTabela.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Aguardando dados da produção...</Text>
      </View>
    );
  }


  function handleIniciar() {
    postIniciar(numpcf, posicao, nomeOperador, 0, etapaAtual.etapa)
      .then(() => {
        Alert.alert('Sucesso', 'Produção iniciada!');
        setAtualizar((prev) => prev + 1);
      })
      .catch(() => Alert.alert('Aviso', 'Não foi possível iniciar '));
  }

  function handlePausar(cadmot: number) {
    postPausar(numpcf, posicao, nomeOperador, cadmot, etapaAtual.etapa)
      .then(() => {
        setModalPausaVisible(false);
        Alert.alert('Sucesso', 'Etapa pausada.' + cadmot);
        setAtualizar((prev) => prev + 1);
      })
      .catch(() => Alert.alert('Erro', 'Falha ao pausar.'));
  }

  function handleRetomar() {
    postRetomar(numpcf, posicao, nomeOperador, 0, etapaAtual.etapa)
      .then(() => {
        Alert.alert('Sucesso', 'Produção retomada!');
        setAtualizar((prev) => prev + 1);
      })
      .catch(() => Alert.alert('Erro', 'Falha ao retomar produção.'));
  }

  function handleFinalizar() {
    postFinalizar(numpcf, posicao, nomeOperador, 0, etapaAtual.etapa)
      .then(() => {
        Alert.alert('Sucesso', 'Produção finalizada!');
        setAtualizar((prev) => prev + 1);
      })
      .catch(() => Alert.alert('Erro', 'Falha ao retomar produção.'));
  }

  function handlePularEtapa() {
    postPularEtapa(numpcf, posicao, nomeOperador, etapaAtual.etapa, 0)
      .then(() => {
        Alert.alert('Sucesso', 'Etapa Pulada!');
      })
      .catch(() => Alert.alert('Erro', 'Falha ao pular Etapa.'));
  }

  function handleAdicionarEtapa() {
    router.push({
      pathname: '/montando-pcf',
    });
  }

  function handleClose() {
    limparContext();
    router.replace('/');
  }

  function verificarPausar() {
    console.log(situacao);
    if (situacao == 'EM PRODUÇÃO') {
      setModalPausaVisible(true);
    } else {
      Alert.alert('Aviso', 'Só é possível pausar se a etapa estiver em produção.');
    }
  }


  const conteudo_tabela = (
    <View className="flex-1 px-12 py-16 mobile:py-12">
      <View>
        <Text className="font-bold text-3xl text-[#414141] mobile:text-2xl">
          Etapas de Produção
        </Text>
      </View>

      {/*Linha 01*/}

      <View className="mt-8 flex-col gap-4 mobile:flex-row mobile:gap-6">
        <View className="flex-1 gap-2 mobile:gap-1">
          <Text className="text-center font-medium text-[1.3rem] text-[#414141] mobile:text-[1.1rem]">
            Código de barras
          </Text>
          <TextInput
            className="rounded-xl bg-white px-2 py-5 text-center text-[1.2rem] shadow-lg mobile:py-4 mobile:text-[1rem] tablet:text-[1.1rem] "
            placeholder=""
            placeholderTextColor="#414141"
            value={codBar}
            readOnly
          />
        </View>
        <View className="flex-1 gap-2 mobile:gap-1">
          <Text className="text-center font-medium text-[1.3rem] text-[#414141] mobile:text-[1rem] tablet:text-[1.1rem] ">
            Nome do Operador
          </Text>
          <TextInput
            className="rounded-xl bg-white px-2 py-5 text-center text-[1.2rem] shadow-lg mobile:py-4 mobile:text-[1rem] tablet:text-[1.1rem] "
            placeholder=""
            placeholderTextColor="#414141"
            readOnly
            value={nomeOperador}
          />
        </View>
        <View className="flex-1 gap-2 mobile:gap-1">
          <Text className="text-center font-medium text-[1.3rem] text-[#414141] mobile:text-[1.1rem]">
            Situação da Etapa
          </Text>
          <TextInput
            className="rounded-xl bg-white px-2 py-5 text-center text-[1.2rem] shadow-lg mobile:py-4 mobile:text-[1rem] tablet:text-[1.1rem]"
            placeholder="Finalizada"
            placeholderTextColor="#414141"
            value={etapaAtual.situac}
            readOnly
          />
        </View>
        <View className="flex-1 gap-2 mobile:gap-1">
          <Text className=" text-center font-medium text-[1.3rem] text-[#414141] mobile:text-[1.1rem]">
            Etapa atual
          </Text>
          <TextInput
            className="rounded-xl bg-white px-2 py-5 text-center text-[1.2rem] shadow-lg mobile:py-4 mobile:text-[1rem] tablet:text-[1.1rem]"
            placeholder="XXX-XXX-XX"
            placeholderTextColor="#414141"
            readOnly
            value={etapaAtual.descri}
          />
        </View>
      </View>

      {/*Linha 02*/}

      <View className="mt-4 block gap-4 mobile:flex mobile:gap-0">
        <View className="flex-1 gap-2 mobile:flex-[10] mobile:gap-1">
          <Text className="text-center font-medium text-[1.3rem] text-[#414141] mobile:text-[1.1rem]">
            Produto Final
          </Text>
          <TextInput
            className="rounded-xl bg-white px-2 py-5 text-center  text-[1.2rem] shadow-lg mobile:py-4 mobile:text-[1rem] tablet:text-[1.1rem]"
            placeholder="XXX-XXX-XX"
            placeholderTextColor="#414141"
            value={nomeProduto}
            readOnly
          />
        </View>
        <View className="flex-1 gap-2 mobile:flex-[3] mobile:gap-1">
          <Text className="text-center font-medium text-[1.3rem] text-[#414141] mobile:text-[1.1rem]">
            Número da PCF
          </Text>
          <TextInput
            className="rounded-xl bg-white px-2 py-5 text-center text-[1.2rem] shadow-lg mobile:py-4 mobile:text-[1rem] tablet:text-[1.1rem]"
            placeholder="XXX-XXX-XX"
            placeholderTextColor="#414141"
            readOnly
            value={numpcf.toString()}
          />
        </View>
      </View>

      {/*Mobile */}
      <Slider dados={infoTabela}/>

      {/*Buttons*/}
      <View className="flex flex-col tablet:flex-row">
        <View className="mt-20 flex-row justify-between tablet:mt-12 tablet:flex-1">
          <TouchableOpacity
            className={`m-1 h-12 flex-1 items-center justify-center rounded-md ${
              botaoDesativadoInciar ? 'bg-gray-300' : 'bg-primary'
            }`}
            onPress={handleIniciar}
            disabled={botaoDesativadoInciar}>
            <Text className="text-center text-[1.2rem] mobile:text-[1rem]">
              <Entypo name="controller-jump-to-start" size={24} color="white" />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`m-1 h-12 flex-1 items-center justify-center rounded-md ${
              botaoDesativadoPausar ? 'bg-gray-300' : 'bg-primary'
            }`}
            onPress={verificarPausar}
            disabled={botaoDesativadoPausar}>
            <Text className="text-center text-[1.2rem] mobile:text-[1rem]">
              <AntDesign name="pause" size={24} color="white" />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`m-1 h-12 flex-1 items-center justify-center rounded-md ${
              botaoDesativadoRetomar ? 'bg-gray-300' : 'bg-primary'
            }`}
            onPress={handleRetomar}
            disabled={botaoDesativadoRetomar}>
            <Text className="text-center font-semibold text-[1.2rem] text-white mobile:text-[1rem]">
              <Fontisto name="arrow-return-left" size={24} color="white" />
            </Text>
          </TouchableOpacity>
        </View>

        <View className="tablet:flex-1 flex-row">
          <TouchableOpacity
            className={`m-1 h-12 flex-1 items-center justify-center rounded-md ${
              botaoDesativadoFinalizar ? 'bg-gray-300' : 'bg-primary'
            }`}
            onPress={handleFinalizar}
            disabled={botaoDesativadoFinalizar}>
            <Text className="text-center font-semibold text-[1.2rem] text-white mobile:text-[1rem]">
              <FontAwesome5 name="stop" size={24} color="white" />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`m-1 h-12 flex-1 items-center justify-center rounded-md ${
              botaoDesativadoPularEtapa ? 'bg-gray-300' : 'bg-primary'
            }`}
            onPress={handlePularEtapa}
            disabled={botaoDesativadoPularEtapa}>
            <Text className="text-center font-semibold text-[1.2rem] text-white mobile:text-[1rem]">
              Pular Etapa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="m-1 h-12 flex-1 items-center justify-center rounded-md bg-primary"
            onPress={handleClose}>
            <Text className="text-center font-semibold text-[1.2rem] text-white mobile:text-[1rem]">
              Voltar ao leitor
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="mt-8 hidden rounded-xl bg-white drop-shadow-lg mobile:flex tablet:mt-12"
        stickyHeaderIndices={[0]}>
        <View className="flex flex-row bg-white pt-2 backdrop-blur-md">
          <Text className="flex-1 border-b-[0.4px] border-[#8E8681]/60 pb-3 text-center font-semibold text-[1.1rem] text-text_primary">
            Etapa
          </Text>
          <Text className="flex-1 border-b-[0.4px] border-[#8E8681]/60 pb-3 text-center font-semibold text-[1.1rem] text-text_primary">
            Situação
          </Text>
          <Text className="flex-1 border-b-[0.4px] border-[#8E8681]/60 pb-3 text-center font-semibold text-[1.1rem] text-text_primary">
            Operador
          </Text>
          <Text className="flex-1 border-b-[0.4px] border-[#8E8681]/60 pb-3 text-center font-semibold text-[1.1rem] text-text_primary">
            Data
          </Text>
          <Text className="flex-1 border-b-[0.4px] border-[#8E8681]/60 pb-3 text-center font-semibold text-[1.1rem] text-text_primary">
            Horário
          </Text>
          <Text className="flex-1 border-b-[0.4px] border-[#8E8681]/60 pb-3 text-center font-semibold text-[1.1rem] text-text_primary">
            Tempo
          </Text>
        </View>

        {infoTabela?.map((item, index) => (
          <View key={index} className="flex flex-row bg-white pt-2 backdrop-blur-md">
            <Text className="flex-1 border-b-[0.4px] border-[#8E8681]/60 pb-3 text-center font-semibold text-[1.1rem] text-black">
              {item.descri}
            </Text>
            <Text className="flex-1 border-b-[0.4px] border-[#8E8681]/60 pb-3 text-center font-semibold text-[1.1rem] text-black">
              {item.situac}
            </Text>
            <Text className="flex-1 border-b-[0.4px] border-[#8E8681]/60 pb-3 text-center font-semibold text-[1.1rem] text-black">
              {item.operador}
            </Text>
            <Text className="flex-1 border-b-[0.4px] border-[#8E8681]/60 pb-3 text-center font-semibold text-[1.1rem] text-black">
              {item.data}
            </Text>
            <Text className="flex-1 border-b-[0.4px] border-[#8E8681]/60 pb-3 text-center font-semibold text-[1.1rem] text-black">
              {item.hora}
            </Text>
            <Text className="flex-1 border-b-[0.4px] border-[#8E8681]/60 pb-3 text-center font-semibold text-[1.1rem] text-black">
              {item.duracao}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/*Button Adicionar Etapa*/}
      <View className="mt-8 flex-row justify-end">
        <TouchableOpacity
          className="m-1 h-12 w-full items-center justify-center rounded-md bg-white shadow-lg mobile:w-52"
          onPress={handleAdicionarEtapa}>
          <Text className="font-semibold text-[1.2rem] text-text_primary mobile:text-[1rem]">
            Adicionar Etapa
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalPausaVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalPausaVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/20 px-6">
          <View className="w-full rounded-2xl bg-white p-6 shadow-xl">
            <Text className="mb-4 font-bold text-xl text-[#414141]">
              Selecione o motivo da pausa:
            </Text>

            <View className="gap-2">
              {[
                { id: 1, motivo: 'Ida ao banheiro' },
                { id: 2, motivo: 'Priorizando outro PCF' },
                { id: 3, motivo: 'Troca de fitas' },
                { id: 4, motivo: 'Manutenção da máquina' },
                { id: 5, motivo: 'Almoço' },
                { id: 6, motivo: 'Fim do expediente' },
              ].map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="rounded-lg bg-gray-100 p-4 active:bg-gray-200"
                  onPress={() => handlePausar(item.id)}>
                  <Text className="text-center font-medium">{item.motivo}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity className="mt-6 p-2" onPress={() => setModalPausaVisible(false)}>
              <Text className="text-center font-bold text-red-500">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );

  if (isMobile) {
    return <ScrollView className="flex-1 bg-[#F5F5F7]">{conteudo_tabela}</ScrollView>;
  } else {
    return <View className="flex-1 bg-[#F5F5F7]">{conteudo_tabela}</View>;
  }
}

export default Tabela_Code;
