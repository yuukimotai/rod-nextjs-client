'use server'
import type { CommentRepository } from '../enterprise-business-rules/repositories/comment-repository';
import type { AxiosResponse } from "axios";

import httpClient from '../frameworks-drivers/http-client';
import Idea from '@/enterprise-business-rules/entities/idea';

class HttpCommentRepository implements CommentRepository {
    async CreateComment(jwt: string, idea_id: number, title: string, content: string, priority_emoji: string): Promise<AxiosResponse | undefined> {
        try {
            return await httpClient.post('/comments', { idea_id, title, content, priority_emoji },
                                                    { 
                                                        headers: {"Content-Type": "application/json", Authorization: `Bearer ${jwt}`}
                                                    }
            );
        } catch (error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }     
    }
    async ShowComments(jwt: string): Promise<AxiosResponse | undefined> {
        try {
            return await httpClient.get('/comments', {headers: {"Authorization": `Bearer ${jwt}`}});
        } catch(error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }
    }
    async UpdateComment(jwt: string, commentId: number, title: string, content: string, priority_emoji: string) {
        try {
            return await httpClient.put(`/comments/${commentId}`, { title: title, content: content, priority_emoji: priority_emoji },
                                                    { headers: {"Content-Type": "application/json", "Authorization": `Bearer ${jwt}`}});
        } catch(error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }
    }
    async DeleteComment(jwt: string, commentId: number) {
        try {
            return await httpClient.delete(`/comments/${commentId}`, { headers: {"Content-Type": "application/json", "Authorization": `Bearer ${jwt}`}});
        } catch(error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }
    }
}

export default HttpCommentRepository;