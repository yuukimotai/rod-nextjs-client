import Idea from '@/enterprise-business-rules/entities/idea';
import type { CommentRepository } from '@/enterprise-business-rules/repositories/comment-repository';

class CreateCommentUseCase {
    constructor(private commentRepo: CommentRepository){}

    async execute(jwt: string,idea_id: number, content: string, priority_emoji: string): Promise<{status: number; title: string}> {
        const response = await this.commentRepo.CreateComment(jwt,idea_id, content, priority_emoji);
        if (response) {
            return {status: response.status, title: response.data.title}
        } else {
            console.error("レスポンスが取得できませんでした");
            return {status: 500, title: "コメント作成失敗"}
        }
    }
}

export default CreateCommentUseCase;