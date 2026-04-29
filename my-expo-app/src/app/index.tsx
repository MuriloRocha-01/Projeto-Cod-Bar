import { Text, View, TextInput, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';

import React from 'react';
import { router } from 'expo-router';
import { useCodbar } from '@/context/CodbarContext';
import Slider from '@/components/Slider';

function Tabela_Code() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768; 

  const { codBar, senha, limparContext } = useCodbar();

  const handleConfirm = () => {
    limparContext();
    router.navigate('/');
  };

  const conteudo_tabela =(                        
    <View className="flex-1 px-12 py-16 mobile:py-12">
      <View>
        <Text className="font-bold text-3xl mobile:text-2xl text-[#414141]">Etapas de Produção</Text>
      </View>

      {/*Linha 01*/}

      <View className="mt-8 flex-col mobile:flex-row gap-4 mobile:gap-6">
        <View className="flex-1 gap-2 mobile:gap-1">
          <Text className="text-center font-medium text-[1.3rem] mobile:text-[1.1rem] text-[#414141]">
            Código de barras
          </Text>
          <TextInput
            className="rounded-xl bg-white px-2 py-5 mobile:py-4  text-center text-[1.2rem] mobile:text-[1rem] tablet:text-[1.1rem] shadow-lg "
            placeholder="XXX-XXX-XX"
            placeholderTextColor="#414141"
            value={codBar}
            readOnly
          />
        </View>
        <View className="flex-1 gap-2 mobile:gap-1">
          <Text className="text-center font-medium text-[1.3rem] mobile:text-[1rem] tablet:text-[1.1rem] text-[#414141] ">
            Nome do Operador
          </Text>
          <TextInput
            className="rounded-xl bg-white px-2 py-5 mobile:py-4  text-center text-[1.2rem] mobile:text-[1rem] tablet:text-[1.1rem] shadow-lg "
            placeholder="Josemar"
            placeholderTextColor="#414141"
            readOnly
          />
        </View>
        <View className="flex-1 gap-2 mobile:gap-1">
          <Text className="text-center font-medium text-[1.3rem] mobile:text-[1.1rem] text-[#414141]">
            Situação da Etapa
          </Text>
          <TextInput
            className="rounded-xl bg-white px-2 py-5 mobile:py-4  text-center text-[1.2rem] mobile:text-[1rem] tablet:text-[1.1rem] shadow-lg"
            placeholder="Finalizada"
            placeholderTextColor="#414141"
            readOnly
          />
        </View>
        <View className="flex-1 gap-2 mobile:gap-1">
          <Text className=" text-center font-medium text-[1.3rem] mobile:text-[1.1rem] text-[#414141]">
            Etapa atual
          </Text>
          <TextInput
            className="rounded-xl bg-white px-2 py-5 mobile:py-4  text-center shadow-lg text-[1.2rem] mobile:text-[1rem] tablet:text-[1.1rem]"
            placeholder="XXX-XXX-XX"
            placeholderTextColor="#414141"
            readOnly
          />
        </View>
      </View>

      {/*Linha 02*/}

      <View className="mt-4 block mobile:flex gap-4 mobile:gap-0">
        <View className="flex-1 mobile:flex-[10] gap-2 mobile:gap-1">
          <Text className="text-center font-medium text-[1.3rem] mobile:text-[1.1rem] text-[#414141]">
            Produto Final
          </Text>
          <TextInput
            className="rounded-xl bg-white px-2 py-5 mobile:py-4  text-center shadow-lg text-[1.2rem] mobile:text-[1rem] tablet:text-[1.1rem]"
            placeholder="XXX-XXX-XX"
            placeholderTextColor="#414141"
          />
        </View>
        <View className="flex-1 mobile:flex-[3] gap-2 mobile:gap-1">
          <Text className="text-center font-medium text-[1.3rem] mobile:text-[1.1rem] text-[#414141]">
            Número da PCF
          </Text>
          <TextInput
            className="rounded-xl bg-white px-2 py-5 mobile:py-4 text-center shadow-lg text-[1.2rem] mobile:text-[1rem] tablet:text-[1.1rem]"
            placeholder="XXX-XXX-XX"
            placeholderTextColor="#414141"
            readOnly
          />
        </View>
      </View>

      {/*Mobile */}
      <Slider />

      {/*Buttons*/}

      <View className="mt-20 flex-row justify-between tablet:mt-16">
        <TouchableOpacity className="m-1 h-12 flex-1 items-center justify-center rounded-md bg-primary">
          <Text className="text-center font-semibold text-[1.2rem] mobile:text-[1rem] text-white">Iniciar</Text>
        </TouchableOpacity>

        <TouchableOpacity className="m-1 h-12 flex-1 items-center justify-center rounded-md bg-primary">
          <Text className="text-center font-semibold text-[1.2rem] mobile:text-[1rem] text-white">Pausar</Text>
        </TouchableOpacity>

        <TouchableOpacity className="m-1 h-12 flex-1 items-center justify-center rounded-md bg-primary">
          <Text className="text-center font-semibold text-[1.2rem] mobile:text-[1rem] text-white">Retomar</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row">
        <TouchableOpacity
          className="m-1 h-12 flex-1 items-center justify-center rounded-md bg-primary"
          onPress={handleConfirm}>
          <Text className="text-center font-semibold text-[1.2rem] mobile:text-[1rem] text-white">Finalizar</Text>
        </TouchableOpacity>

        <TouchableOpacity className="m-1 h-12 flex-1 items-center justify-center rounded-md bg-primary">
          <Text className="text-center font-semibold text-[1.2rem] mobile:text-[1rem] text-white">Pular Etapa</Text>
        </TouchableOpacity>

        <TouchableOpacity className="m-1 h-12 flex-1 items-center justify-center rounded-md bg-primary">
          <Text className="text-center font-semibold text-[1.2rem] mobile:text-[1rem] text-white">Limpar</Text>
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

        <View className="flex flex-row pt-3">
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            em andamento
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            em andamento
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            Josemar
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            30/08/2026
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            10:45
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            45min
          </Text>
        </View>
        <View className="flex flex-row pt-3">
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            em andamento
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            em andamento
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            Josemar
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            30/08/2026
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            10:45
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            45min
          </Text>
        </View>
        <View className="flex flex-row pt-3">
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            em andamento
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            em andamento
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            Josemar
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            30/08/2026
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            10:45
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            45min
          </Text>
        </View>
        <View className="flex flex-row pt-3">
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            em andamento
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            em andamento
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            Josemar
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            30/08/2026
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            10:45
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            45min
          </Text>
        </View>
        <View className="flex flex-row pt-3">
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            em andamento
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            em andamento
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            Josemar
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            30/08/2026
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            10:45
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            45min
          </Text>
        </View>
        <View className="flex flex-row pt-3">
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            em andamento
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            em andamento
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            Josemar
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            30/08/2026
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            10:45
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            45min
          </Text>
        </View>
        <View className="flex flex-row pt-3">
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            em andamento
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            em andamento
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            Josemar
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            30/08/2026
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            10:45
          </Text>
          <Text className="flex-1 border-b-[0.3px] border-[#8E8681]/60 pb-3 text-center font-medium">
            45min
          </Text>
        </View>
      </ScrollView>




      {/*Button Adicionar Etapa*/}
      <View className="mt-8 flex-row justify-end">
        <TouchableOpacity className="m-1 h-12 w-full mobile:w-52 items-center justify-center rounded-md bg-white shadow-lg">
          <Text className="font-semibold text-[1.2rem] mobile:text-[1rem] text-text_primary">Adicionar Etapa</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  
  if (isMobile) {
    return (
      <ScrollView className="bg-[#F5F5F7] flex-1">
        {conteudo_tabela}
      </ScrollView>
    );
  }

  return (
    <View className="bg-[#F5F5F7] flex-1">
      {conteudo_tabela}
    </View>
  );

}




export default Tabela_Code;
