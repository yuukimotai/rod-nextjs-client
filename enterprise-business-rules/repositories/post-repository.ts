import type { AxiosResponse } from "axios";

export interface PostRepository {
    createPost(jwt: string, title: string, content: string, priority_emoji: string, is_public: boolean): Promise<AxiosResponse | undefined>;
    showPosts(jwt: string): Promise<AxiosResponse | undefined>;
    updatePost(jwt: string, postId: number, title: string, content:string, priorityEmoji: string, isPublic: boolean): Promise<AxiosResponse | undefined>;
    deletePost(jwt: string, postId: number): Promise<AxiosResponse | undefined>
}