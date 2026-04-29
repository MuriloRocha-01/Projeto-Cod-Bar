import { InfoTabelaType } from '@/data/SliderData';
import { View, useWindowDimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  interpolate, 
  Extrapolation, 
  SharedValue 
} from 'react-native-reanimated';

type PaginationProps = {
  items: InfoTabelaType[];
  paginationIndex: number;
  scrollX: SharedValue<number>; 
};

const Pagination = ({ items, paginationIndex, scrollX }: PaginationProps) => {
  const { width } = useWindowDimensions();

  return (
    <View className="flex-row items-center justify-center z-10">
      {items.map((_, index) => {
        const pgAnimationStyle = useAnimatedStyle(() => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

          const dotWidth = interpolate(
            scrollX.value,
            inputRange,
            [8, 20, 8],
            Extrapolation.CLAMP
          );

          return {
            width: dotWidth,
          };
        });

        return (
          <Animated.View
            key={index}
            style={[
              {
                height: 8,
                borderRadius: 100,
                marginHorizontal: 6,
                backgroundColor: paginationIndex === index ? '#222' : "#aaa",
              },
              pgAnimationStyle 
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;