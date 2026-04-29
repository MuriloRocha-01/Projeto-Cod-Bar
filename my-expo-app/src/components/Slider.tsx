import { InfoTabela } from '@/data/SliderData';
import React, { useState, useRef } from 'react';
import { View, FlatList, ViewToken } from 'react-native';
import SliderItem from './SliderItem';
import Pagination from './Pagination';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';

export default function Slider() {
  const [paginationIndex, setPaginationIndex] = useState(0);

  const scrollX = useSharedValue(0);

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

  {/* dei -mx-12 pois tem um padding no tabela_code_bar que me impedi que ocupe a tela inteira, para que o card funcione corretamente precisei utilizar o -mx-12*/}
  return (
    <View className="-mx-12 flex h-[50vh] mt-8 mobile:hidden">
      <Animated.FlatList
        data={InfoTabela}
        renderItem={({ item, index }) => <SliderItem item={item} index={index} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollHandler} 
        scrollEventThrottle={16} 
        viewabilityConfig={viewabilityConfig.current}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
      <Pagination items={InfoTabela} paginationIndex={paginationIndex} scrollX={scrollX} />
    </View>
  );
}
