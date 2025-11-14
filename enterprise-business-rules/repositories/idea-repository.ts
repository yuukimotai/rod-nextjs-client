import type { AxiosResponse } from "axios";

export interface IdeaRepository {
    CreateIdea(jwt: string, title: string, content: string, priority_emoji: string, is_public: boolean): Promise<AxiosResponse | undefined>;
    ShowIdea(jwt: string, ideaId: number): Promise<AxiosResponse | undefined>;
    ShowIdeas(jwt: string): Promise<AxiosResponse | undefined>;
    ShowSharedIdeas(jwt: string): Promise<AxiosResponse | undefined>;
    UpdateIdea(jwt: string, ideaId: number, title: string, content:string, priorityEmoji: string, isPublic: boolean): Promise<AxiosResponse | undefined>;
    DeleteIdea(jwt: string, ideaId: number): Promise<AxiosResponse | undefined>
}