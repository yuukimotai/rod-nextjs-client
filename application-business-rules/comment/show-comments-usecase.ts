import type { AxiosResponse } from "axios";
import type { CommentRepository } from '@/enterprise-business-rules/repositories/comment-repository';

class ShowCommentsUseCase {
    constructor(private commentRepo: CommentRepository){}

    async execute(jwt: string): Promise<AxiosResponse | undefined> {
        const response = await this.commentRepo.ShowComments(jwt);
        if (response) {
            return response;
        } else {
            return undefined;
        }
    }
}

export default ShowCommentsUseCase;