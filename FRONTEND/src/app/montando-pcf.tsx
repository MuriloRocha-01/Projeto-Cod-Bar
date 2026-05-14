import { useCodbar } from '@/context/CodbarContext';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import ExemploReordenar from '@/components/montando-pcf/ExemploReordenar';
import { setEtapaData } from '@/data/EtapaData';
import { useTabela } from '@/hooks/tabela.hook';

// Dica: Use PascalCase (MontandoPcf) para nomes de componentes React
function MontandoPcf() {
  const { codBar, senha, numpcf, posicao, limparContext } = useCodbar();
  const [loading, setLoading] = useState(false);
  const { getTabela } = useTabela();

  useEffect(() => {
    // Chamada da função assim que a tela monta
    trazerEtapas();
  }, []);

  function trazerEtapas() {
    getTabela(numpcf).then((tabela) => {
      if (!tabela || tabela.length === 0) {
        Alert.alert('Erro', 'Nenhuma etapa encontrada no banco para este código.');
        setLoading(false);
        return;
      }
      setEtapaData(tabela);
    });
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="mb-4 font-bold text-xl">Numero PCF: {numpcf}</Text>

        <View className="mb-3 w-full">
          <Text className="font-semibold">Etapa:</Text>
          <TextInput
            className="w-full rounded border border-gray-300 p-2"
            placeholder="Informe a etapa"
          />
        </View>

        <View className="mb-3 w-full">
          <Text className="font-semibold">Dimensões:</Text>
          <TextInput
            className="w-full rounded border border-gray-300 p-2"
            placeholder="Ex: 100x200"
          />
        </View>

        <View className="mb-3 w-full">
          <Text className="font-semibold">Características:</Text>
          <TextInput
            className="w-full rounded border border-gray-300 p-2"
            placeholder="Informa as caracteristicas"
          />
        </View>

        <View className="mb-3 w-full">
          <Text className="font-semibold">Duração (hhhh,mm):</Text>
          <TextInput
            className="w-full rounded border border-gray-300 p-2"
            keyboardType="numeric"
            placeholder="Ex: 00:00:00"
          />
        </View>
        <View>
          <ExemploReordenar />
        </View>

        <View className="flex-row items-center justify-around gap-3 px-3">
          <TouchableOpacity className="w-1/3 rounded-lg bg-primary px-4 py-3 ">
            <Text className="text-center font-bold text-white">Incluir Etapa</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/3 rounded-lg bg-primary px-4 py-3 ">
            <Text className="text-center font-bold text-white">Imprimir</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/3 rounded-lg bg-primary px-4 py-3 ">
            <Text className="text-center font-bold text-white">Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// O nome do export default deve ser o mesmo da função
export default MontandoPcf;
