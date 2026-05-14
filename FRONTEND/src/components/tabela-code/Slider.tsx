import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ViewToken } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedScrollHandler 
} from 'react-native-reanimated';
import { ItemTabela } from '@/data/SliderData'; 

import SliderItem from './SliderItem';
import Pagination from './Pagination';

// 1. Declaramos que o Slider agora obrigatoriamente recebe os dados da tela principal
type SliderProps = {
  dados: ItemTabela[];
};

export default function Slider({ dados }: SliderProps) {
  // 2. Inicializamos o estado local diretamente com as propriedades recebidas
  const [dadosLocais, setDadosLocais] = useState<ItemTabela[]>(dados);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);

  // 3. Este useEffect monitora quando a tela de tabelas atualizar o banco de dados. 
  // No momento em que ela mudar, o Slider atualiza o carrossel no mesmo milissegundo.
  useEffect(() => {
    if (dados) {
      setDadosLocais(dados);
    }
  }, [dados]);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setPaginationIndex(viewableItems[0].index);
    }
  });

  if (!dadosLocais || dadosLocais.length === 0) {
    return (
      <View className="mt-8 h-[30vh] items-center justify-center bg-white rounded-xl mx-4 shadow-sm">
        <Text className="text-[#414141] font-medium text-lg">
          Aguardando etapas de produção...
        </Text>
      </View>
    );
  }

  return (
    <View className="-mx-12 flex h-[50vh] mt-8 mobile:hidden">
      <Animated.FlatList
        data={dadosLocais}
        renderItem={({ item, index }) => <SliderItem item={item} index={index} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollHandler} 
        scrollEventThrottle={16} 
        viewabilityConfig={viewabilityConfig.current}
        onViewableItemsChanged={onViewableItemsChanged.current}
        keyExtractor={(_, index) => index.toString()}
      />
      
      <Pagination 
        items={dadosLocais} 
        paginationIndex={paginationIndex} 
        scrollX={scrollX} 
      />
    </View>
  );
}