import type { AxiosResponse } from "axios";
export interface PostRepostitory {
    createPost(jwt: string, title: string, content: string, priority_emoji: string): Promise<AxiosResponse | undefined>;
    showPosts(jwt: string): Promise<AxiosResponse | undefined>;
    updatePost(jwt: string, postId: number, title: string, content:string, priority_emoji: string): Promise<AxiosResponse | undefined>;
    deletePost(jwt: string, postId: number): Promise<AxiosResponse | undefined>
}