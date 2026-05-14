import { Stack } from 'expo-router'
import "../../global.css"; 
import { CodbarProvider } from '@/context/CodbarContext';

export default function Layout(){
    return(
        <CodbarProvider>
            <Stack screenOptions={{headerShown:false}}>
                <Stack.Screen name="index"/>
                <Stack.Screen name="code-bar-senha"/>
                <Stack.Screen name="tabela-code"/>
                <Stack.Screen name="montando-pcf"/>
            </Stack>
        </CodbarProvider>
    )

}