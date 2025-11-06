'use server';

import { cookies } from 'next/headers';
import  PostRepository from '@/interface-adapters/http-post-repository';
import CreatePostUseCase from '@/application-business-rules/post/create-post-usecase';

const CreateAction = async (title: string, content: string, is_public: boolean): Promise<{status: number, title: string}> => {
    const cookieStore = cookies();
    const postRepository = new PostRepository();
    const createPostUseCase = new CreatePostUseCase(postRepository);
    const jwt = (await cookieStore).get('ignidea_bearer');
    let result = {status: 500, title: ""}
    
    if (jwt) {
        result = await createPostUseCase.execute(jwt.value, title, content, "", is_public);
    }
    if (result.status === 201) {
        return {status: result.status, title: result.title }
    } else {
        return { status: 500, title: "投稿作成に失敗しました" };
    }
}

export default CreateAction;