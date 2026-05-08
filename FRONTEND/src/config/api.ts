import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.1.17:3000',
    timeout: 10000,
    headers:{
        'Content-Type': 'application/json',
    }
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            console.error(`[API Error] Status: ${error.response.status} -`, error.response.data);
            
            // Aqui poderíamos disparar um Toast (notificação na tela) global futuramente
        } else if (error.request) {
            console.error('[API Error] Sem resposta do servidor. O Back-end está rodando?');
        } else {
            console.error('[API Error] Erro ao configurar a requisição:', error.message);
        }
        return Promise.reject(error);
    }
);