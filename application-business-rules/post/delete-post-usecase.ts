import type { PostRepostitory } from '../../enterprise-business-rules/repositories/post-repository';

class DeletePostUseCase {
    constructor(private postRepo: PostRepostitory){}

    async execute(jwt: string, postId: number): Promise<{status: number; title: string}> {
        const response = await this.postRepo.deletePost(jwt, postId);
        if (response) {
            return {status: response.status, title: response.data.title}
        } else {
            console.error("レスポンスが取得できませんでした");
            return {status: 500, title: "投稿削除失敗"}
        }
    }
}

export default DeletePostUseCase;