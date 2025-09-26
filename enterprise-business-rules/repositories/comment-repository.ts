import type { AxiosResponse } from "axios";
export interface CommentRepostitory {
    createComment(jwt: string, title: string, content: string, priority_emoji: string): Promise<AxiosResponse | undefined>;
    showComments(jwt: string): Promise<AxiosResponse | undefined>;
    updateComment(jwt: string, postId: number, title: string, content:string, priority_emoji: string): Promise<AxiosResponse | undefined>;
    deleteComment(jwt: string, postId: number): Promise<AxiosResponse | undefined>
}