'use client'
import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';

import Idea from '@/enterprise-business-rules/entities/idea';
import Comment from '@/enterprise-business-rules/entities/comment';
import FetchTargetIdeaAction from '@/frameworks-drivers/ideas/fetch-target-idea-action';
//import Idea from '@/enterprise-business-rules/entities/idea';
import UpdateMyCommentButton from './ui/update-mycomment-button';
import DeleteMyCommentButton from './ui/delete-mycomment-button';

interface Props {
    comment: Comment | undefined;
}

const MyCommentDetail = ({comment}: Props) => {
    const [idea, setIdea] = useState<Idea>();
    const [ideaId, setIdeaId] = useState<number>(comment?.idea_id ? comment.idea_id : 0);
    const [content, setContent] = useState<string>(comment?.content ? comment.content : '');

    const fetchIdea = async () => {
        const result = await FetchTargetIdeaAction(ideaId);
        if (result.status === 200) {
            setIdea(result.data);
        }
        if (result?.status !==200) {
            alert("投稿の読み込みに失敗しました。ログインしてください");
            redirect('/auth/login');
        }
    }
    const inputContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        if (comment){
            comment.content = e.target.value;
        }
    }

    useEffect(() => {
        if (comment && comment.id) {
            fetchIdea();
        }
    }, [comment]);
    useEffect(() => {
    }, [idea]);

    return(
        <>
            <h2>コメントしたアイデア</h2>
            { idea &&
                <div className='border border-cyan-300 rounded mb-16 p-4'>
                    <h3>{idea.title}</h3>
                    <p>{idea.content}</p>
                    <p>☺{idea.priority_emoji}</p>
                </div>
            }
            <h2>自分のコメント</h2>
            <div className='border border-cyan-300 rounded min-h-80'>
                <ul className='flex flex-col'>
                    <li className='border border-cyan-300 rounded m-1 min-h-40'>
                        <textarea name="content" id="content" className='w-full' value={comment?.content} onChange={inputContentChange} ></textarea>
                    </li>
                </ul>
                <ul className='flex flex-row justify-end m-1 space-x-2'>
                    <li>
                        <DeleteMyCommentButton comment={comment} />
                    </li>
                    <li>
                        <UpdateMyCommentButton comment={comment} />
                    </li>
                </ul>
            </div>
        </>
    )
}

export default MyCommentDetail;