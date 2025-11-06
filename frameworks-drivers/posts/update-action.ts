'use server';

import { cookies } from 'next/headers';
import  PostRepository from '@/interface-adapters/http-post-repository';
import UpdatePostUseCase from '@/application-business-rules/post/update-post-usecase';

const UpdateAction = async (postId: number, title: string, content: string, isPublic: boolean): Promise<{status: number, title: string}> => {
    const cookieStore = cookies();
    const postRepository = new PostRepository();
    const updatePostUseCase = new UpdatePostUseCase(postRepository);
    const jwt = (await cookieStore).get('ignidea_bearer');
    let result = {status: 500, title: ""}
    
    if (jwt) {
        result = await updatePostUseCase.execute(jwt.value, postId, title, content, "", isPublic);
    }
    if (result.status === 200) {
        return {status: result.status, title: result.title }
    } else {
        return { status: 500, title: "更新に失敗しました" };
    }
}

export default UpdateAction;