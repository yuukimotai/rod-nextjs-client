'use server';

import { cookies } from 'next/headers';
import  IdeaRepository from '@/interface-adapters/http-idea-repository';
import DeleteIdeaUseCase from '@/application-business-rules/idea/delete-idea-usecase';

const DeleteAction = async (postId: number): Promise<{status: number, title: string}> => {
    const cookieStore = cookies();
    const ideaRepository = new IdeaRepository();
    const deleteIdeaUseCase = new DeleteIdeaUseCase(ideaRepository);
    const jwt = (await cookieStore).get('ignidea_bearer');
    let result = {status: 500, title: ""}
    
    if (jwt) {
        result = await deleteIdeaUseCase.execute(jwt.value, postId);
    }
    if (result.status === 204) {
        return {status: result.status, title: result.title }
    } else {
        return { status: 500, title: "更新に失敗しました" };
    }
}

export default DeleteAction;