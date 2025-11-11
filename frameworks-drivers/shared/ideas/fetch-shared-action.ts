'use server';

import {AxiosError, AxiosResponse} from 'axios';
import { cookies } from 'next/headers';
import Idea from '@/enterprise-business-rules/entities/idea'
import IdeaRepository from '@/interface-adapters/http-idea-repository';
import ShowSharedIdeasUseCase from '@/application-business-rules/shared/idea/show-shared-ideas-usecase';

const FetchAction = async (): Promise<{status: number, data: Idea[]}> => {
    const cookieStore = cookies();
    const ideaRepository = new IdeaRepository();
    const showSharedIdeasUseCase = new ShowSharedIdeasUseCase(ideaRepository);
    const jwt = (await cookieStore).get('ignidea_bearer');
    let result: AxiosResponse | undefined;
    let ideas: Idea[];
    
    if (jwt) {
        result = await showSharedIdeasUseCase.execute(jwt.value);
    }
    if (result) {
        ideas = result?.data;
        return {status: result.status, data: ideas}
    } else {
        ideas = []
        return {status: 500, data: ideas}
    }
}

export default FetchAction;