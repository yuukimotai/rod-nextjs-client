import type { AxiosResponse } from 'axios';
import type { PostRepostitory } from '../../enterprise-business-rules/repositories/post-repository';

class UpdatePostUseCase {
    constructor(private postRepo: PostRepostitory){}

    async execute(jwt: string, postId: number,title: string, content: string, priority_emoji: string): Promise<{status: number; title: string}> {
        const response = await this.postRepo.updatePost(jwt, postId, title, content, priority_emoji);
        if (response) {
            return {status: response.status, title: response.data.title}
        } else {
            console.error("レスポンスが取得できませんでした");
            return {status: 500, title: "投稿更新失敗"}
        }
    }
}

export default UpdatePostUseCase;