import type { PostRepository } from '../enterprise-business-rules/repositories/post-repository';
import type { AxiosResponse } from "axios";

import httpClient from '../../infrastructure/adapter/httpClient.ts';

class HttpPostRepository implements PostRepository {
    async createPost(jwt: string, title: string, content: string, priority_emoji: string): Promise<AxiosResponse | undefined> {
        try {
            return await httpClient.post('/posts', { title, content, priority_emoji },
                                                    { 
                                                        headers: {"Content-Type": "application/json", Authorization: `Bearer ${jwt}`}
                                                    }
            );
        } catch (error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }     
    }
    async showPosts(jwt: string): Promise<AxiosResponse | undefined> {
        try {
            return await httpClient.get('/posts', {headers: {"Authorization": `Bearer ${jwt}`}});
        } catch(error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }
    }
    async updatePost(jwt: string, postId: number, title: string, content: string, priority_emoji: string) {
        try {
            return await httpClient.put(`/posts/${postId}`, { title: title, content: content, priority_emoji: priority_emoji },
                                                    { headers: {"Content-Type": "application/json", "Authorization": `Bearer ${jwt}`}});
        } catch(error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }
    }
    async deletePost(jwt: string, postId: number) {
        try {
            return await httpClient.delete(`/posts/${postId}`, { headers: {"Content-Type": "application/json", "Authorization": `Bearer ${jwt}`}});
        } catch(error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }
    }
}

export default HttpPostRepository;