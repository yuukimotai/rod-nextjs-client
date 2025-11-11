import type { IdeaRepository } from '@/enterprise-business-rules/repositories/idea-repository';

class DeleteIdeaUseCase {
    constructor(private ideaRepo: IdeaRepository){}

    async execute(jwt: string, postId: number): Promise<{status: number; title: string}> {
        const response = await this.ideaRepo.DeleteIdea(jwt, postId);
        if (response) {
            return {status: response.status, title: response.data.title}
        } else {
            console.error("レスポンスが取得できませんでした");
            return {status: 500, title: "投稿削除失敗"}
        }
    }
}

export default DeleteIdeaUseCase;