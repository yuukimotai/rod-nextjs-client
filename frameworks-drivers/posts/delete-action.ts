'use server';

import { cookies } from 'next/headers';
import  PostRepository from '@/interface-adapters/http-post-repository';
import DeletePostUseCase from '@/application-business-rules/post/delete-post-usecase';

const DeleteAction = async (postId: number): Promise<{status: number, title: string}> => {
    const cookieStore = cookies();
    const postRepository = new PostRepository();
    const deletePostUseCase = new DeletePostUseCase(postRepository);
    const jwt = (await cookieStore).get('ignidea_bearer');
    let result = {status: 500, title: ""}
    
    if (jwt) {
        result = await deletePostUseCase.execute(jwt.value, postId);
    }
    if (result.status === 204) {
        return {status: result.status, title: result.title }
    } else {
        return { status: 500, title: "更新に失敗しました" };
    }
}

export default DeleteAction;