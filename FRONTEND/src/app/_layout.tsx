import { Stack } from 'expo-router'
import "../../global.css"; 
import { CodbarProvider } from '@/context/CodbarContext';

export default function Layout(){
    return(
        <CodbarProvider>
            <Stack screenOptions={{headerShown:false}}>
            </Stack>
        </CodbarProvider>
    )

}