import type { AxiosResponse } from 'axios';
import type { IdeaRepository } from '@/enterprise-business-rules/repositories/idea-repository';

class ShowIdeasUseCase {
    constructor(private ideaRepo: IdeaRepository){}

    async execute(jwt: string): Promise<AxiosResponse | undefined> {
        const response = await this.ideaRepo.showIdeas(jwt);
        if (response) {
            return response;
        } else {
            return undefined;
        }
    }
}

export default ShowIdeasUseCase;