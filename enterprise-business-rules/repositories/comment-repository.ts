import type { AxiosResponse } from "axios";
import Idea from "@/enterprise-business-rules/entities/idea";

export interface CommentRepository {
    CreateComment(jwt: string, idea: Idea, title: string, content: string, priority_emoji: string): Promise<AxiosResponse | undefined>;
    ShowComments(jwt: string): Promise<AxiosResponse | undefined>;
    UpdateComment(jwt: string, postId: number, title: string, content:string, priority_emoji: string): Promise<AxiosResponse | undefined>;
    DeleteComment(jwt: string, postId: number): Promise<AxiosResponse | undefined>
}