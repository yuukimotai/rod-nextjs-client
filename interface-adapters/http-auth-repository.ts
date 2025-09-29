'use server'
import type { AuthRepository } from '../enterprise-business-rules/repositories/auth-repository';
import httpClient from '../frameworks-drivers/http-client';

class HttpAuthRepository implements AuthRepository {
    async register(email: string, password: string, confirm_password: string): Promise<{status: number, jwt: string}> {
        try {
            const response = await httpClient.post('/create-account', { email, password, confirm_password });
            const token = response.headers['authorization'];

            return { status: response.status, jwt: token };
        } catch (error) {
            console.error(`${error}: サーバーに接続できませんでした`);
            return { status: 500, jwt: '' };
        }
    }
    async login(email: string, password: string): Promise<{status: number, jwt: string}> {
        try {
            const response = await httpClient.post('/login', { email, password });
            const token = response.headers['authorization'];

            return { status: response.status, jwt: token };
        } catch (error) {
            console.error(`${error}: サーバーに接続できませんでした`);
            return { status: 500, jwt: '' };
        }   
    }
    async logout(jwt: string): Promise<{ status: number}> {
        try {
            const response = await httpClient.post('/logout',
                { headers:{"Content-Type": "application/json", Authorization: `Bearer ${ jwt }`,}});
            
            return { status: response.status};
        } catch (error) {
            console.error(`${error}: サーバーに接続できませんでした`);
            return { status: 500};
        }   
    }
    async unregister(jwt: string, password: string): Promise<{ status: number}> {
        try {
                const response = await httpClient.post('/close-account', { password: password },
                    { headers: { Authorization: `Bearer ${jwt}`, "Content-Type": "application/json"}});
                console.log(response)
                return { status: response.status };
        } catch (error) {
            console.error(`${error}: サーバーに接続できませんでした`);
            return { status: 500 };
        }   
    }
}

export default HttpAuthRepository;