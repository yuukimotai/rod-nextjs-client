import type { AxiosResponse } from "axios";
import type { MyCommentRepository } from '@/enterprise-business-rules/repositories/mycomment-repository';

class DeleteMyCommentUseCase {
    constructor(private commentRepo: MyCommentRepository){}

    async execute(jwt: string, commentId: number): Promise<AxiosResponse | undefined> {
        const response = await this.commentRepo.DeleteMyComment(jwt, commentId);
        if (response) {
            return response;
        } else {
            return undefined;
        }
    }
}

export default DeleteMyCommentUseCase;