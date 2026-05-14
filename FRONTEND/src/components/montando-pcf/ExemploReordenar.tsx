import { useCallback, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { InfoEtapa } from "@/data/EtapaData";
import { useCodbar } from "@/context/CodbarContext";





export default function ExemploReordenar() {
  console.log(InfoEtapa)
  const [etapas, setEtapas] = useState(InfoEtapa);
  const { codBar, senha, numpcf, posicao, limparContext } = useCodbar();


  const renderItem = useCallback(({ item, drag, isActive }: RenderItemParams<any>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag} // Segure a linha para arrastar
          disabled={isActive}
          className={`flex-row p-3 border-b border-gray-200 items-center ${
            isActive ? 'bg-blue-200' : 'bg-white'
          }`}
        >
          <View className="w-12">
            
            <Text className="font-bold text-gray-500">{item.posicao}º</Text>
          </View>
          
          <View className="flex-1">
            <Text className="font-bold text-lg">{item.etapa}</Text>
            <Text className="text-gray-400 text-sm">Descrição:{item.descri}</Text>
            <Text className="text-gray-400 text-sm">Duração:{item.duracao}</Text>
          </View>
          
          <View>
            <Text className="text-xs text-gray-300">≡</Text> 
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  }, []);

  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className=" bg-gray-50">
        <View className=" bg-white border-b border-gray-300">
          <Text className="text-center font-bold text-xl">Reordenar Etapas (Segure para mover)</Text>

          <Text>Posicao:</Text>
        </View>

        <DraggableFlatList
          data={etapas}
          onDragEnd={({ data }) => {
            const novaOrdem = data.map((item, index) => ({
              ...item,
              posicao: index + 1,
            }));
            
            setEtapas(novaOrdem);
            console.log("Nova ordem para salvar no banco:", novaOrdem);
          }}
          keyExtractor={(item, index) => item.idVirtual || `temp-${item.numpcf}-${index}`}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}