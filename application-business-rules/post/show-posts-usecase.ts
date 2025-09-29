import type { AxiosResponse } from 'axios';
import type { PostRepository } from '@/enterprise-business-rules/repositories/post-repository';

class ShowPostsUseCase {
    constructor(private postRepo: PostRepository){}

    async execute(jwt: string): Promise<AxiosResponse | undefined> {
        const response = await this.postRepo.showPosts(jwt);
        if (response) {
            return response;
        } else {
            return undefined;
        }
    }
}

export default ShowPostsUseCase;