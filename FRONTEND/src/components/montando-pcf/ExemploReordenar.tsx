import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { ItemEtapa } from '@/data/EtapaData';

interface ExemploReordenarProps {
  dados: ItemEtapa[];
  setDados: React.Dispatch<React.SetStateAction<ItemEtapa[]>>;
}

export default function ExemploReordenar({ dados, setDados }: ExemploReordenarProps) {
  return (
    <DraggableFlatList
      data={dados}
      onDragEnd={({ data }) => setDados(data)}
      keyExtractor={(item) => item.idVirtual || String(item.etapa)}
      
      // O SEGREDO ESTÁ AQUI:
      // O padding horizontal deve ficar dentro da lista
      contentContainerStyle={{ 
        paddingHorizontal: 30, // Equivale ao seu px-8 ou px-12
        paddingVertical: 10,
        flexGrow: 1 
      }}
      
      renderItem={({ item, drag, isActive }) => {
        return (
          // Use um activeScale baixo para não "vazar" muito
          <ScaleDecorator activeScale={1.02}> 
            <TouchableOpacity
              onLongPress={drag}
              disabled={isActive}
              // Adicionamos mx-1 para garantir que a sombra apareça
              className={`p-4 mb-3 mx-1 rounded-xl border flex-row justify-between items-center shadow-xl ${
                isActive ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-200'
              }`}
              style={{
                elevation: isActive ? 10 : 2,
              }}
            >
              <View className="flex-1">
                <Text className="text-gray-500 text-xs">Posição: {item.posicao}</Text>
                <View className='flex-row gap-4'>
                  <Text className="font-bold text-gray-800 text-[1.2rem]">Etapa: {item.descri}</Text>
                  <Text className="text-[1.1rem] text-gray-600 flex-1" numberOfLines={1}>{item.dimensionais}</Text>
                </View>
                <Text className="text-[0.8rem] text-gray-600 w-24"> Duração: {item.tempo_etapa}hr</Text>
              </View>
              <Text className="text-gray-300 text-2xl">≡</Text>
            </TouchableOpacity>
          </ScaleDecorator>
        );
      }}
    />
  );
}