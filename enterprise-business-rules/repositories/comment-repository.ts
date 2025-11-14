import type { AxiosResponse } from "axios";

export interface CommentRepository {
    CreateComment(jwt: string, ideaId: number, content: string, priorityEmoji: string): Promise<AxiosResponse | undefined>;
    ShowComments(jwt: string, ideaId: number): Promise<AxiosResponse | undefined>;
    UpdateComment(jwt: string, ideaId: number, title: string, content:string, priorityEmoji: string): Promise<AxiosResponse | undefined>;
    DeleteComment(jwt: string, ideaId: number): Promise<AxiosResponse | undefined>
}