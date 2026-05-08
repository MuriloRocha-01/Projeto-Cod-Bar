import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';
import { useCodbar } from '@/context/CodbarContext';
import Slider from '@/components/Slider';
import { InfoTabela } from '@/data/SliderData';

function Tabela_Code() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const params = useLocalSearchParams();
  const nomeOperador = params.nomeOperador as string;
  const nomeProduto = params.nomeProduto as string;
  const { codBar, senha, numpcf,posicao, limparContext } = useCodbar();

  const primeiroItem = InfoTabela[0];

  const etapaAtual = InfoTabela.find(item => item.posicao === posicao) || primeiroItem;

  console.log('etapa', etapaAtual)
  const handleConfirm = () => {
    limparContext();
    router.navigate('/');
  };

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
      <Slider />

      {/*Buttons*/}

      <View className="mt-20 flex-row justify-between tablet:mt-16">
        <TouchableOpacity className="m-1 h-12 flex-1 items-center justify-center rounded-md bg-primary">
          <Text className="text-center font-semibold text-[1.2rem] text-white mobile:text-[1rem]">
            Iniciar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="m-1 h-12 flex-1 items-center justify-center rounded-md bg-primary">
          <Text className="text-center font-semibold text-[1.2rem] text-white mobile:text-[1rem]">
            Pausar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="m-1 h-12 flex-1 items-center justify-center rounded-md bg-primary">
          <Text className="text-center font-semibold text-[1.2rem] text-white mobile:text-[1rem]">
            Retomar
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row">
        <TouchableOpacity
          className="m-1 h-12 flex-1 items-center justify-center rounded-md bg-primary"
          onPress={handleConfirm}>
          <Text className="text-center font-semibold text-[1.2rem] text-white mobile:text-[1rem]">
            Finalizar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="m-1 h-12 flex-1 items-center justify-center rounded-md bg-primary">
          <Text className="text-center font-semibold text-[1.2rem] text-white mobile:text-[1rem]">
            Pular Etapa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="m-1 h-12 flex-1 items-center justify-center rounded-md bg-primary">
          <Text className="text-center font-semibold text-[1.2rem] text-white mobile:text-[1rem]">
            Limpar
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="hidden mobile:flex mt-8 rounded-xl bg-white drop-shadow-lg tablet:mt-12"
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

        {InfoTabela?.map((item, index) => (
          <View key={index} className="flex flex-row bg-white pt-2 backdrop-blur-md">
            <Text className="flex-1 border-b-[0.4px] border-[#8E8681]/60 pb-3 text-center font-semibold text-[1.1rem] text-text_primary">
              {item.descri}
            </Text>
            <Text className="flex-1 border-b-[0.4px] border-[#8E8681]/60 pb-3 text-center font-semibold text-[1.1rem] text-text_primary">
              {item.situac}
            </Text>
            <Text className="flex-1 border-b-[0.4px] border-[#8E8681]/60 pb-3 text-center font-semibold text-[1.1rem] text-text_primary">
              {item.operador}
            </Text>
            <Text className="flex-1 border-b-[0.4px] border-[#8E8681]/60 pb-3 text-center font-semibold text-[1.1rem] text-text_primary">
              {item.data}
            </Text>
            <Text className="flex-1 border-b-[0.4px] border-[#8E8681]/60 pb-3 text-center font-semibold text-[1.1rem] text-text_primary">
              {item.hora}
            </Text>
            <Text className="flex-1 border-b-[0.4px] border-[#8E8681]/60 pb-3 text-center font-semibold text-[1.1rem] text-text_primary">
              {item.duracao}min
            </Text>
          </View>
        ))}
      </ScrollView>

      {/*Button Adicionar Etapa*/}
      <View className="mt-8 flex-row justify-end">
        <TouchableOpacity className="m-1 h-12 w-full items-center justify-center rounded-md bg-white shadow-lg mobile:w-52">
          <Text className="font-semibold text-[1.2rem] text-text_primary mobile:text-[1rem]">
            Adicionar Etapa
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isMobile) {
    return <ScrollView className="flex-1 bg-[#F5F5F7]">{conteudo_tabela}</ScrollView>;
  } else {
    return <View className="flex-1 bg-[#F5F5F7]">{conteudo_tabela}</View>;
  }
}

export default Tabela_Code;
