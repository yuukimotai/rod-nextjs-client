import type { AxiosResponse } from "axios";
import type { MyCommentRepository } from '@/enterprise-business-rules/repositories/mycomment-repository';

class ShowMyCommentsUseCase {
    constructor(private commentRepo: MyCommentRepository){}

    async execute(jwt: string): Promise<AxiosResponse | undefined> {
        const response = await this.commentRepo.ShowMyComments(jwt);
        if (response) {
            return response;
        } else {
            return undefined;
        }
    }
}

export default ShowMyCommentsUseCase;