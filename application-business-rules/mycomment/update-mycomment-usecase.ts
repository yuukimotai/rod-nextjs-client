import type { AxiosResponse } from "axios";
import type { MyCommentRepository } from '@/enterprise-business-rules/repositories/mycomment-repository';

class UpdateMyCommentsUseCase {
    constructor(private commentRepo: MyCommentRepository){}

    async execute(jwt: string, commentId: number, content: string, priority_emoji: string): Promise<AxiosResponse | undefined> {
        const response = await this.commentRepo.UpdateMyComment(jwt, commentId, content, priority_emoji);
        if (response) {
            return response;
        } else {
            return undefined;
        }
    }
}

export default UpdateMyCommentsUseCase;