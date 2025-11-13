'use client'
import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';

import Idea from '@/enterprise-business-rules/entities/idea';
import Comment from '@/enterprise-business-rules/entities/comment';
import FetchAction from '@/frameworks-drivers/ideas/fetch-action';
//import Idea from '@/enterprise-business-rules/entities/idea';
//import UpdateMyCommentButton from './ui/update-idea-button';
//import DeleteMyCommentButton from './ui/delete-idea-button';

interface Props {
    comment: Comment | undefined;
}

const MyCommentDetail = ({comment}: Props) => {
    const [idea, setIdea] = useState<Idea>();
    const [content, setContent] = useState<string>(comment?.content ? comment.content : '');

    const fetchIdeas = async () => {
        const result = await FetchAction();
        if (result.status === 200) {
            setIdea(result.data[0] as Idea);
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
        alert(comment?.content)
    }, [comment?.content]);
    
    return(
        <>
            <h2>コメントしたアイデア</h2>
            <div className='border border-cyan-300 rounded mb-16 p-4'>
                <h3>アイデア1のタイトル</h3>
                <p>アイデア1の内容</p>
                <p>☺</p>
            </div>
            <h2>自分のコメント</h2>
            <div className='border border-cyan-300 rounded min-h-80'>
                <ul className='flex flex-col'>
                    <li className='border border-cyan-300 rounded m-1 min-h-40'>
                        <textarea name="content" id="content" className='w-full' value={comment?.content} onChange={inputContentChange} ></textarea>
                    </li>
                </ul>
                <ul className='justify-end m-1 space-x-2'>
                    <li>
                        削除ボタン
                    </li>
                    <li>
                        更新ボタン
                    </li>
                </ul>
            </div>
        </>
    )
}

export default MyCommentDetail;