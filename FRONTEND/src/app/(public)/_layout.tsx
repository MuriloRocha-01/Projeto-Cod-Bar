import { Stack } from 'expo-router'
import "../../../global.css"; 

export default function PublicLayout(){
    return(
            <Stack screenOptions={{headerShown:false}}>
                <Stack.Screen name="index"/>
                <Stack.Screen name="code-bar-senha"/>
            </Stack> 
    )

}