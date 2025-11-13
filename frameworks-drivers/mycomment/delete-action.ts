'use server';

import { cookies } from 'next/headers';
import  MyCommentRepository from '@/interface-adapters/http-mycomment-repository';
import DeleteMyCommentUseCase from '@/application-business-rules/mycomment/delete-mycomment-usecase';

const DeleteAction = async (postId: number): Promise<{status: number, title: string}> => {
    const cookieStore = cookies();
    const myCommentRepository = new MyCommentRepository();
    const deleteIdeaUseCase = new DeleteMyCommentUseCase(myCommentRepository);
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