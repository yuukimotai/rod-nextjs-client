'use server';

import {AxiosError, AxiosResponse} from 'axios';
import { cookies } from 'next/headers';
import Post from '@/enterprise-business-rules/entities/post'
import  PostRepository from '@/interface-adapters/http-post-repository';
import ShowPostsUseCase from '@/application-business-rules/post/show-posts-usecase';

const FetchAction = async (): Promise<{status: number, data: Post[]}> => {
    const cookieStore = cookies();
    const postRepository = new PostRepository();
    const showPostsUseCase = new ShowPostsUseCase(postRepository);
    const jwt = (await cookieStore).get('ignidea_bearer');
    let result: AxiosResponse | undefined;
    let posts: Post[];
    
    if (jwt) {
        result = await showPostsUseCase.execute(jwt.value);
    }
    if (result) {
        posts = result?.data;
        return {status: result.status, data: posts}
    } else {
        posts = []
        return {status: 500, data: posts}
    }
}

export default FetchAction;