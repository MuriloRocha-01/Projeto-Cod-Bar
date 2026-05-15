import { Stack } from 'expo-router'
import "../../../global.css"; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function PrivateLayout(){
    return(
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{headerShown:false}}>
                <Stack.Screen name="tabela-code"/>
                <Stack.Screen name="montando-pcf"/>
            </Stack>
        </GestureHandlerRootView>
    )

}


