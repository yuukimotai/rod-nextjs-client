import type { AxiosResponse } from "axios";
import type { CommentRepostitory } from '../../enterprise-business-rules/repositories/comment-repository';

class ShowCommentsUseCase {
    constructor(private commentRepo: CommentRepostitory){}

    async execute(jwt: string): Promise<AxiosResponse | undefined> {
        const response = await this.commentRepo.showComments(jwt);
        if (response) {
            return response;
        } else {
            return undefined;
        }
    }
}

export default ShowCommentsUseCase;