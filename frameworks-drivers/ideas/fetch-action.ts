'use server';

import {AxiosError, AxiosResponse} from 'axios';
import { cookies } from 'next/headers';
import Post from '@/enterprise-business-rules/entities/idea'
import  IdeaRepository from '@/interface-adapters/http-idea-repository';
import ShowIdeasUseCase from '@/application-business-rules/idea/show-ideas-usecase';

const FetchAction = async (): Promise<{status: number, data: Post[]}> => {
    const cookieStore = cookies();
    const ideaRepository = new IdeaRepository();
    const showPostsUseCase = new ShowIdeasUseCase(ideaRepository);
    const jwt = (await cookieStore).get('ignidea_bearer');
    let result: AxiosResponse | undefined;
    let ideas: Post[];
    
    if (jwt) {
        result = await showPostsUseCase.execute(jwt.value);
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