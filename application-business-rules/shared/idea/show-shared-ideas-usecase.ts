import type { AxiosResponse } from 'axios';
import type { IdeaRepository } from '@/enterprise-business-rules/repositories/idea-repository';

class ShowSharedIdeasUseCase {
    constructor(private ideaRepo: IdeaRepository){}

    async execute(jwt: string): Promise<AxiosResponse | undefined> {
        const response = await this.ideaRepo.ShowSharedIdeas(jwt);
        if (response) {
            return response;
        } else {
            return undefined;
        }
    }
}

export default ShowSharedIdeasUseCase;