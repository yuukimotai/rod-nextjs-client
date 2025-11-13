'use server'
import type { MyCommentRepository } from '../enterprise-business-rules/repositories/mycomment-repository';
import type { AxiosResponse } from "axios";

import httpClient from '../frameworks-drivers/http-client';


class HttpMyCommentRepository implements MyCommentRepository {
    async ShowMyComments(jwt: string): Promise<AxiosResponse | undefined> {
        try {
            return await httpClient.get('/my_comments', {headers: {"Authorization": `Bearer ${jwt}`}});
        } catch(error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }
    }
    async UpdateMyComment(jwt: string, commentId: number, content: string, priority_emoji: string) {
        try {
            return await httpClient.put(`/my_comments/${commentId}`, { content: content, priority_emoji: priority_emoji },
                                                    { headers: {"Content-Type": "application/json", "Authorization": `Bearer ${jwt}`}});
        } catch(error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }
    }
    async DeleteMyComment(jwt: string, commentId: number) {
        try {
            return await httpClient.delete(`/my_comments/${commentId}`, { headers: {"Content-Type": "application/json", "Authorization": `Bearer ${jwt}`}});
        } catch(error) {
            console.error(`${error}: サーバーに接続できませんでした`);
        }
    }
}

export default HttpMyCommentRepository;