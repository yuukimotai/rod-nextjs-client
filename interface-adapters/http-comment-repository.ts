'use server'
import type { CommentRepository } from '../enterprise-business-rules/repositories/comment-repository';
import type { AxiosResponse } from "axios";

import httpClient from '../frameworks-drivers/http-client';

class HttpCommentRepository implements CommentRepository {
    async createComment(jwt: string, title: string, content: string, priority_emoji: string): Promise<AxiosResponse | undefined> {
        try {
            return await httpClient.post('/comments', { title, content, priority_emoji },
                                                    { 
                                                        headers: {"Content-Type": "application/json", Authorization: `Bearer ${jwt}`}
                                                    }
            );
        } catch (error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }     
    }
    async showComments(jwt: string): Promise<AxiosResponse | undefined> {
        try {
            return await httpClient.get('/comments', {headers: {"Authorization": `Bearer ${jwt}`}});
        } catch(error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }
    }
    async updateComment(jwt: string, commentId: number, title: string, content: string, priority_emoji: string) {
        try {
            return await httpClient.put(`/comments/${commentId}`, { title: title, content: content, priority_emoji: priority_emoji },
                                                    { headers: {"Content-Type": "application/json", "Authorization": `Bearer ${jwt}`}});
        } catch(error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }
    }
    async deleteComment(jwt: string, commentId: number) {
        try {
            return await httpClient.delete(`/comments/${commentId}`, { headers: {"Content-Type": "application/json", "Authorization": `Bearer ${jwt}`}});
        } catch(error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }
    }
}

export default HttpCommentRepository;