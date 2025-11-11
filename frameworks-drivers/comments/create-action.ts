'use server';

import { cookies } from 'next/headers';
import  CommentRepository from '@/interface-adapters/http-comment-repository';
import CreateCommentUseCase from '@/application-business-rules/comment/create-comment-usecase';
import Idea from '@/enterprise-business-rules/entities/idea';

const CreateAction = async (idea: Idea, title: string, content: string): Promise<{status: number, title: string}> => {
    const cookieStore = cookies();
    const commentRepository = new CommentRepository();
    const createCommentUseCase = new CreateCommentUseCase(commentRepository);
    const jwt = (await cookieStore).get('ignidea_bearer');
    let result = {status: 500, title: ""}
    
    if (jwt) {
        result = await createCommentUseCase.execute(jwt.value, idea, title, content, "👍");
    }
    if (result.status === 201) {
        return {status: result.status, title: result.title }
    } else {
        return { status: 500, title: "投稿作成に失敗しました" };
    }
}

export default CreateAction;