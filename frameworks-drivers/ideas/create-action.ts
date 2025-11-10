'use server';

import { cookies } from 'next/headers';
import  IdeaRepository from '@/interface-adapters/http-idea-repository';
import CreateIdeaUseCase from '@/application-business-rules/idea/create-idea-usecase';

const CreateAction = async (title: string, content: string, is_public: boolean): Promise<{status: number, title: string}> => {
    const cookieStore = cookies();
    const ideaRepository = new IdeaRepository();
    const createIdeaUseCase = new CreateIdeaUseCase(ideaRepository);
    const jwt = (await cookieStore).get('ignidea_bearer');
    let result = {status: 500, title: ""}
    
    if (jwt) {
        result = await createIdeaUseCase.execute(jwt.value, title, content, "", is_public);
    }
    if (result.status === 201) {
        return {status: result.status, title: result.title }
    } else {
        return { status: 500, title: "投稿作成に失敗しました" };
    }
}

export default CreateAction;