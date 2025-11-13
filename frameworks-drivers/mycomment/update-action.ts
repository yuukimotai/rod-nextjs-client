'use server';

import { cookies } from 'next/headers';
import  MyCommentRepository from '@/interface-adapters/http-mycomment-repository';
import UpdateMyCommentUseCase from '@/application-business-rules/mycomments/update-mycomment-usecase';

const UpdateAction = async (commentId: number, content: string): Promise<{status: number, title: string}> => {
    const cookieStore = cookies();
    const myCommentRepository = new MyCommentRepository();
    const updateMyCommentUseCase = new UpdateMyCommentUseCase(myCommentRepository);
    const jwt = (await cookieStore).get('ignidea_bearer');
    let result = {status: 500, title: ""}
    
    if (jwt) {
        result = await updateMyCommentUseCase.execute(jwt.value, commentId, content, "");
    }
    if (result.status === 200) {
        return {status: result.status, title: result.title }
    } else {
        return { status: 500, title: "更新に失敗しました" };
    }
}

export default UpdateAction;