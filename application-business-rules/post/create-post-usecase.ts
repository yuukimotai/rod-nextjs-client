import type { PostRepository } from '@/enterprise-business-rules/repositories/post-repository';

class CreatePostUseCase {
    constructor(private postRepo: PostRepository){}

    async execute(jwt: string, title: string, content: string, priority_emoji: string): Promise<{status: number; title: string}> {
        const response = await this.postRepo.createPost(jwt, title, content, priority_emoji);
        if (response) {
            return {status: response.status, title: response.data.title}
        } else {
            console.error("レスポンスが取得できませんでした");
            return {status: 500, title: "投稿作成失敗"}
        }
    }
}

export default CreatePostUseCase;