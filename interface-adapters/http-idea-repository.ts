'use server'
import type { IdeaRepository } from '../enterprise-business-rules/repositories/idea-repository';
import type { AxiosResponse } from "axios";

import httpClient from '../frameworks-drivers/http-client';

class HttpIdeaRepository implements IdeaRepository {
    async createIdea(jwt: string, title: string, content: string, priority_emoji: string, is_public: boolean): Promise<AxiosResponse | undefined> {
        try {
            return await httpClient.post('/ideas', { title, content, priority_emoji, is_public },
                                                    { 
                                                        headers: {"Content-Type": "application/json", Authorization: `Bearer ${jwt}`}
                                                    }
            );
        } catch (error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }     
    }
    async showIdeas(jwt: string): Promise<AxiosResponse | undefined> {
        try {
            return await httpClient.get('/ideas', {headers: {"Content-Type": "application/json", "Authorization": `Bearer ${jwt}`}});
        } catch(error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }
    }
    async updateIdea(jwt: string, ideaId: number, title: string, content: string, priority_emoji: string, isPublic: boolean): Promise<AxiosResponse | undefined> {
        try {
            return await httpClient.put(`/ideas/${ideaId}`, { title: title, content: content, priority_emoji: priority_emoji, is_public: isPublic },
                                                    { headers: {"Content-Type": "application/json", "Authorization": `Bearer ${jwt}`}});
        } catch(error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }
    }
    async deleteIdea(jwt: string, ideaId: number) {
        try {
            return await httpClient.delete(`/ideas/${ideaId}`, { headers: {"Content-Type": "application/json", "Authorization": `Bearer ${jwt}`}});
        } catch(error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }
    }
}

export default HttpIdeaRepository;