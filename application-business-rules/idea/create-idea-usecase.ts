import type { IdeaRepository } from '@/enterprise-business-rules/repositories/idea-repository';

class CreateIdeaUseCase {
    constructor(private ideaRepo: IdeaRepository){}

    async execute(jwt: string, title: string, content: string, priority_emoji: string, is_public: boolean): Promise<{status: number; title: string}> {
        const response = await this.ideaRepo.CreateIdea(jwt, title, content, priority_emoji, is_public);
        if (response) {
            return {status: response.status, title: response.data.title}
        } else {
            console.error("レスポンスが取得できませんでした");
            return {status: 500, title: "投稿作成失敗"}
        }
    }
}

export default CreateIdeaUseCase;