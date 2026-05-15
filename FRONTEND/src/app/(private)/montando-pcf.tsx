import { useCodbar } from '@/context/CodbarContext';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import ExemploReordenar from '@/components/montando-pcf/ExemploReordenar';
import { ItemEtapa } from '@/data/EtapaData'; // Importamos apenas a Interface (Tipo)
import { useTabela } from '@/hooks/tabela.hook';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useInclusaoEtapa } from '@/hooks/InclusaoEtapa.hook';

import ModalCarregamento from '@/components/modalCarregamento/ModalCarregamento'


function MontandoPcf() {
  const { postInclusaoEtapa } = useInclusaoEtapa();
  const { numpcf} = useCodbar();
  const [loading, setLoading] = useState(false);
  const { getabelaEtapa } = useTabela();
  const router = useRouter();
  const [listaEtapas, setListaEtapas] = useState<ItemEtapa[]>([]);
  
  const [etapa, setEtapa] = useState('');
  const [dimensao,setDimensao] = useState('');
  const [caracteristica,setCaracteristica] = useState('');
  const [duracao, setDuracao] = useState('');

  useEffect(()=>{
  trazerEtapas();
  },[numpcf])


  function handleVoltar() {
    if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('/tabela-code');
  }
  }
  function verficaCampos(){
    if(!etapa || !dimensao || !caracteristica || !duracao){
      Alert.alert('Aviso', 'É necessario preencher todos os campos')
      return false
    }
      return true;
  }

  function handleIncluiEtapa() {
    if (!verficaCampos()) return;
    setLoading(true);
    postInclusaoEtapa(numpcf, etapa, dimensao, caracteristica, Number(duracao))
    .then((response)=>{
      if(!response){
            Alert.alert('Erro', 'Erro ao inserir a nova etapa', [
              { text: 'OK' },
            ]);
            return;
      }
    }).catch((error)=>{
          console.log('Erro na API getInclusaoEtapa:', error);
          Alert.alert("Erro 400", JSON.stringify(error.response?.data))
    }).finally(()=>{
      setLoading(false);
    })
  
  }

  function handleImprimir() {}

  function trazerEtapas() {
    if (!numpcf) return;

    setLoading(true);
    getabelaEtapa(numpcf)
      .then((dados) => {
        if (!dados || dados.length === 0) {
          Alert.alert('Erro', 'Nenhuma etapa encontrada no banco para este código.');
          return;
        }
        
        
        const tabelaFormatada = dados.map((item: ItemEtapa, idx: number) => ({
          ...item,
          idVirtual: item.idVirtual || `etapa-${item.etapa || idx}-${idx}`,
        }));
        setListaEtapas(tabelaFormatada);
      })
      .catch((err) => {
        console.error('Erro ao buscar etapas:', err);
        Alert.alert('Erro', 'Falha ao conectar com o banco de dados.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <View className="flex-1 bg-white">
      {loading ? (
        <ModalCarregamento/>
      ) : (
        <View className=" flex-1 bg-gray-100 px-8 py-16 mobile:px-12 mobile:py-22">
          <Text className="mb-4 text-center font-bold text-xl">Número PCF: {numpcf}</Text>

          {/* Área de Inputs */}
          <View className="mb-3 w-full">
            <Text className="pb-1 text-center font-medium text-[1.3rem] text-[#414141] mobile:text-[1.1rem]">
              Etapa
            </Text>

            <View className="justify-center overflow-hidden rounded-xl bg-white shadow-lg mobile:h-[56px] tablet:h-[64px] ">
              <Picker
                selectedValue={etapa}
                onValueChange={(itemValue) => setEtapa(itemValue)}
                style={{ backgroundColor: 'transparent' }}
                dropdownIconColor="#414141">
                <Picker.Item label="Selecione a etapa..." value={null} color="#999" />

                {listaEtapas.map((etapa) => (
                  <Picker.Item
                    key={etapa.posicao}
                    label={etapa.descri}
                    value={etapa.descri}
                    style={{ fontSize: 16 }}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View className="mb-3 w-full">
            <Text className="pb-1 text-center font-medium text-[1.3rem] text-[#414141] mobile:text-[1.1rem]">
              Dimensões:
            </Text>
            <TextInput
              className="rounded-xl bg-white px-1 py-5 text-center text-[1.2rem] shadow-lg mobile:py-3 mobile:text-[1rem] tablet:text-[1.1rem]"
              placeholder="8,00 x 0,53"
              value={dimensao}
              onChangeText={setDimensao}
            />
          </View>

          <View className="mb-3 w-full">
            <Text className="pb-1 text-center font-medium text-[1.3rem] text-[#414141] mobile:text-[1.1rem]">
              Características:
            </Text>
            <TextInput
              className="rounded-xl bg-white px-1 py-5 text-center text-[1.2rem] shadow-lg mobile:py-3 mobile:text-[1rem] tablet:text-[1.1rem]"
              placeholder="Informa as caracteristicas"
              value={caracteristica}
              onChangeText={setCaracteristica}
            />
          </View>

          <View className="mb-3 w-full">
            <Text className="pb-1 text-center font-medium text-[1.3rem] text-[#414141] mobile:text-[1.1rem]">
              Duração (hhhh,mm):
            </Text>
            <TextInput
              className="rounded-xl bg-white px-1 py-5 text-center text-[1.2rem] shadow-lg mobile:py-4 mobile:text-[1rem] tablet:text-[1.1rem]"
              keyboardType="numeric"
              placeholder="00:00:00"
              value={duracao}
              onChangeText={setDuracao}
            />
          </View>

          <View className="flex-1 my-6 overflow-visible -mx-8 mobile:-mx-12">
              <Text className="mb-2 text-center text-xs text-gray-400">Segure para reordenar as etapas</Text>
              <ExemploReordenar dados={listaEtapas} setDados={setListaEtapas} />
          </View>

          <View className="mt-2 flex-row items-center justify-around gap-2 px-1">
            <TouchableOpacity className="flex-1 rounded-lg bg-primary py-3">
              <Text
                className="text-center font-bold text-lg text-white"
                onPress={handleIncluiEtapa}>
                Incluir Etapa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 rounded-lg bg-primary py-3">
              <Text className="text-center font-bold text-lg text-white" onPress={handleImprimir}>
                Imprimir
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 rounded-lg bg-primary py-3">
              <Text className="text-center font-bold text-lg text-white" onPress={handleVoltar}>
                Voltar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

export default MontandoPcf;
