import { Stack } from 'expo-router'
import "../../global.css"; 
import { CodbarProvider } from '@/context/CodbarContext';

export default function Layout(){
    return(
        <CodbarProvider>
            <Stack screenOptions={{headerShown:false}}>
                <Stack.Screen name="index" />
                <Stack.Screen name="code_bar_senha"/>
                <Stack.Screen name="tabela_code_bar"/>
            </Stack>
        </CodbarProvider>
    )

}