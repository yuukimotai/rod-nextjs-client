'use server';

import {AxiosError, AxiosResponse} from 'axios';
import { cookies } from 'next/headers';
import Comment from '@/enterprise-business-rules/entities/comment'
import  MyCommentRepository from '@/interface-adapters/http-mycomment-repository';
import ShowMyCommentsUseCase from '@/application-business-rules/mycomment/show-mycomments-usecase';

const FetchAction = async (): Promise<{status: number, data: Comment[]}> => {
    const cookieStore = cookies();
    const myCommentRepository = new MyCommentRepository();
    const showMyCommentsUseCase = new ShowMyCommentsUseCase(myCommentRepository);
    const jwt = (await cookieStore).get('ignidea_bearer');
    let result: AxiosResponse | undefined;
    let comments: Comment[];
    
    if (jwt) {
        result = await showMyCommentsUseCase.execute(jwt.value);
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