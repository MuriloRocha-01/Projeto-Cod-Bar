import React, { useState, useRef, useCallback } from 'react';
import { View, Text, ViewToken } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedScrollHandler 
} from 'react-native-reanimated';
import { useFocusEffect } from 'expo-router';

// Imports dos seus arquivos
import { InfoTabela } from '@/data/SliderData';
import SliderItem from './SliderItem';
import Pagination from './Pagination';

export default function Slider() {
  // Estado local para forçar o React a renderizar quando os dados globais mudarem
  const [dadosLocais, setDadosLocais] = useState([...InfoTabela]);
  const [paginationIndex, setPaginationIndex] = useState(0);

  const scrollX = useSharedValue(0);

  // Hook que dispara toda vez que a tela de Tabela ganha foco
  useFocusEffect(
    useCallback(() => {
      // Atualizamos o estado local com o conteúdo atual do arquivo de dados
      setDadosLocais([...InfoTabela]);
    }, [])
  );

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

  // Caso os dados ainda não tenham chegado da API
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