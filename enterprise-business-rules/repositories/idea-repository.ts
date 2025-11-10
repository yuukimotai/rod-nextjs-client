import type { AxiosResponse } from "axios";

export interface IdeaRepository {
    createIdea(jwt: string, title: string, content: string, priority_emoji: string, is_public: boolean): Promise<AxiosResponse | undefined>;
    showIdeas(jwt: string): Promise<AxiosResponse | undefined>;
    updateIdea(jwt: string, ideaId: number, title: string, content:string, priorityEmoji: string, isPublic: boolean): Promise<AxiosResponse | undefined>;
    deleteIdea(jwt: string, ideaId: number): Promise<AxiosResponse | undefined>
}