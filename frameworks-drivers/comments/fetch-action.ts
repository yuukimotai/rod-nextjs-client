'use server';

import {AxiosError, AxiosResponse} from 'axios';
import { cookies } from 'next/headers';
import Comment from '@/enterprise-business-rules/entities/comment'
import  IdeaRepository from '@/interface-adapters/http-comment-repository';
import ShowCommentsUseCase from '@/application-business-rules/comment/show-comments-usecase';

const FetchAction = async (): Promise<{status: number, data: Comment[]}> => {
    const cookieStore = cookies();
    const commentRepository = new IdeaRepository();
    const showCommentsUseCase = new ShowCommentsUseCase(commentRepository);
    const jwt = (await cookieStore).get('ignidea_bearer');
    let result: AxiosResponse | undefined;
    let comments: Comment[];
    
    if (jwt) {
        result = await showCommentsUseCase.execute(jwt.value);
    }
    if (result) {
        comments = result?.data;
        return {status: result.status, data: comments}
    } else {
        comments = []
        return {status: 500, data: comments}
    }
}

export default FetchAction;