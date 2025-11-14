'use server';

import { cookies } from 'next/headers';
import  MyCommentRepository from '@/interface-adapters/http-mycomment-repository';
import UpdateMyCommentUseCase from '@/application-business-rules/mycomment/update-mycomment-usecase';

const UpdateAction = async (commentId: number, content: string): Promise<{status: number, title: string}> => {
    const cookieStore = cookies();
    const myCommentRepository = new MyCommentRepository();
    const updateMyCommentUseCase = new UpdateMyCommentUseCase(myCommentRepository);
    const jwt = (await cookieStore).get('ignidea_bearer')?.value || '';

    
    if (!jwt) {
        return {status: 401, title: "ログインしてください"};
    }

    const result = await updateMyCommentUseCase.execute(jwt, commentId, content, "");

    if (result?.status === 200) {
        return {status: result.status, title: "更新に成功しました"};
    } else {
        return { status: 500, title: "更新に失敗しました" };
    }
}

export default UpdateAction;