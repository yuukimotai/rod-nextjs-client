'use server';

import {AxiosError, AxiosResponse} from 'axios';
import { cookies } from 'next/headers';
import Idea from '@/enterprise-business-rules/entities/idea'
import  IdeaRepository from '@/interface-adapters/http-idea-repository';
import ShowIdeaUseCase from '@/application-business-rules/idea/show-idea-usecase';

const FetchTargetIdeaAction = async (ideaId: number): Promise<{status: number, data: Idea}> => {
    const cookieStore = cookies();
    const ideaRepository = new IdeaRepository();
    const showIdeaUseCase = new ShowIdeaUseCase(ideaRepository);
    const jwt = (await cookieStore).get('ignidea_bearer');
    let result: AxiosResponse | undefined;
    let idea: Idea;
    
    if (jwt) {
        result = await showIdeaUseCase.execute(jwt.value, ideaId);
    }
    if (result) {
        idea = result?.data;
        return {status: result.status, data: idea}
    } else {
        return {status: 500, data: new Idea()}
    }
}

export default FetchTargetIdeaAction;