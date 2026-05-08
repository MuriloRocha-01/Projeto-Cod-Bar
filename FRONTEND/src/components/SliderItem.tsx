import { ItemTabela } from '@/data/SliderData';
import React from 'react';
import { View, Text } from 'react-native';
import { useCodbar } from '@/context/CodbarContext'; // Importe seu contexto

type Props = {
  item: ItemTabela;
  index: number;
};

const SliderItem = ({ item, index }: Props) => {
  const { posicao } = useCodbar(); // Pega a posição vinda do scanner (ex: 2)

  // Verifica se este item é a etapa atual baseada na posição
  // Usamos item.posicao pois ela representa a ordem real no processo
  const isEtapaAtual = item.posicao === posicao;

  return (
    <View className="w-screen justify-center px-12">
      {/* Aplicamos a borda condicionalmente: 
                Se for a etapa atual, adicionamos 'border-2 border-[#F87E2C]' 
            */}
      <View
        className={`flex flex-col gap-6 rounded-xl bg-white px-12 text-start shadow-lg ${isEtapaAtual ? 'border-4 border-primary' : 'border border-transparent'}`}>
        {isEtapaAtual && (
          <View className="absolute right-4 top-2 rounded-full bg-primary px-2 py-1">
            <Text className="font-bold text-xs text-white">ATUAL</Text>
          </View>
        )}

        <View className="pt-5">
          <Text className="font-bold text-[1.4rem]">Etapa:</Text>
          <Text className="font-medium text-[1.3rem]">{item.descri}</Text>
        </View>

        <View className="text-[1.2rem]">
          <Text className="font-bold text-[1.3rem]">Situação:</Text>
          <Text
            className={`font-medium text-[1.3rem] ${isEtapaAtual ? 'text-primary' : 'text-[#414141]'}`}>
            {item.situac}
          </Text>
        </View>

        <View className="text-[1.2rem]">
          <Text className="font-bold text-[1.3rem]">Operador:</Text>
          <Text className="font-medium text-[1.3rem]">{item.operador || 'Aguardando'}</Text>
        </View>

        <Text className="font-medium text-[1.3rem]">
          <Text className="font-bold text-[1.3rem]">Data:</Text> {item.data}
        </Text>

        <Text className="font-medium text-[1.3rem]">
          <Text className="font-bold text-[1.3rem]">Hora:</Text> {item.hora}
        </Text>

        <Text className="rounded-b-xl pb-5 font-medium text-[1.3rem]">
          <Text className="font-bold text-[1.3rem]">Tempo:</Text> {item.duracao}
        </Text>
      </View>
    </View>
  );
};

export default SliderItem;
