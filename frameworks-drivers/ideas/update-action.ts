'use server';

import { cookies } from 'next/headers';
import  IdeaRepository from '@/interface-adapters/http-idea-repository';
import UpdateIdeaUseCase from '@/application-business-rules/idea/update-idea-usecase';

const UpdateAction = async (ideaId: number, title: string, content: string, isPublic: boolean): Promise<{status: number, title: string}> => {
    const cookieStore = cookies();
    const ideaRepository = new IdeaRepository();
    const updateIdeaUseCase = new UpdateIdeaUseCase(ideaRepository);
    const jwt = (await cookieStore).get('ignidea_bearer');
    let result = {status: 500, title: ""}
    
    if (jwt) {
        result = await updateIdeaUseCase.execute(jwt.value, ideaId, title, content, "", isPublic);
    }
    if (result.status === 200) {
        return {status: result.status, title: result.title }
    } else {
        return { status: 500, title: "更新に失敗しました" };
    }
}

export default UpdateAction;