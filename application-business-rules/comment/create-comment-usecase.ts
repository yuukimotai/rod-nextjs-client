import type { CommentRepostitory } from '../../enterprise-business-rules/repositories/comment-repository';
class CreateCommentUseCase {
    constructor(private commentRepo: CommentRepostitory){}

    async execute(jwt: string, title: string, content: string, priority_emoji: string): Promise<{status: number; title: string}> {
        const response = await this.commentRepo.createComment(jwt, title, content, priority_emoji);
        if (response) {
            return {status: response.status, title: response.data.title}
        } else {
            console.error("レスポンスが取得できませんでした");
            return {status: 500, title: "投稿作成失敗"}
        }
    }
}

export default CreateCommentUseCase;