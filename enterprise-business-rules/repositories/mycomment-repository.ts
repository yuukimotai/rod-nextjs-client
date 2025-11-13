import type { AxiosResponse } from "axios";

export interface MyCommentRepository {
    ShowMyComments(jwt: string): Promise<AxiosResponse | undefined>;
    UpdateMyComment(jwt: string, ideaId: number, content:string, priorityEmoji: string): Promise<AxiosResponse | undefined>;
    DeleteMyComment(jwt: string, ideaId: number): Promise<AxiosResponse | undefined>
}