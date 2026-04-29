import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useCodbar } from '@/context/CodbarContext';
import { useState } from 'react';
import { router } from 'expo-router'


function Code_bar_Senha() {

    const {code} = useLocalSearchParams<{code : string}>();
    const [passwordInput, setPasswordInput] = useState('');

    const { SaveContext } = useCodbar();

    const handleConfirm = () => {
        if(!passwordInput) {
             Alert.alert("É necessario que você digite a senha ")
            return
        } else{ 
            SaveContext(code, passwordInput)
            router.navigate('/tabela_code_bar')       
        }
    
}

    return (
        <View className='w-full h-full bg-[#F5F5F7] items-center justify-center gap-6'>          
            <Text className='text-center text-[#414141] text-xl text-bold'>Digite sua senha: </Text>

            <TextInput
                className='bg-white w-52 h-12 text-center text-[1.1rem] rounded-xl drop-shadow-lg'
                placeholder="XXX-XXX-XX"
                placeholderTextColor="#414141"
                secureTextEntry={true} 
                keyboardType="numeric"
                value={passwordInput}
                onChangeText={setPasswordInput}
            />

            
            <TouchableOpacity 
                className="bg-primary h-12 w-52 items-center justify-center rounded-md"
                onPress={handleConfirm}
            >
                <Text className="text-white text-center font-bold text-lg">
                    Confirmar 
                </Text>
            </TouchableOpacity>
            <Text>Codigo de barras : {code} </Text>
        </View>
    )
}

export default Code_bar_Senha