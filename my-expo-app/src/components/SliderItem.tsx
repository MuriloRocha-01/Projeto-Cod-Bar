import { InfoTabelaType } from '@/data/SliderData';
import React from 'react'
import { View, Text } from 'react-native'

type Props={
    item: InfoTabelaType;
    index:number;
}

const SliderItem = ({item, index}:Props) =>{
    return (
      <View className='px-12 justify-center w-screen '>
        <View className='shadow-lg rounded-xl flex flex-col text-start px-12 bg-white gap-6'>
        <View className='pt-5'>
        <Text className='font-bold text-[1.4rem]'>Etapa:</Text>
        <Text className='font-medium text-[1.3rem]'>{item.etapa}</Text>
        </View>
        <View className='text-[1.2rem] '>
        <Text className='font-bold text-[1.3rem]'>Situação:</Text>
        <Text className='font-medium text-[1.3rem]'>{item.situacao}</Text>
        </View>
        <View className='text-[1.2rem] '>
        <Text className='font-bold text-[1.3rem]'>Operador:</Text>
        <Text className='font-medium text-[1.3rem]'>{item.operador}</Text>
        </View>
        <Text className='font-medium text-[1.3rem] '><Text className='font-bold text-[1.3rem]'>Data:</Text> {item.data}</Text>
        <Text className='font-medium text-[1.3rem] '><Text className='font-bold text-[1.3rem]'>Hora:</Text> {item.hora}</Text>
        <Text className='rounded-b-xl font-medium text-[1.3rem] pb-5 '><Text className='font-bold text-[1.3rem]'>Tempo:</Text> {item.tempo}</Text>
        </View>
      </View>
    )
  
}

export default SliderItem;