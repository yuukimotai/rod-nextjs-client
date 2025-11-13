'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, redirect } from 'next/navigation';

import FetchSharedAction from '@/frameworks-drivers/shared/ideas/fetch-shared-action';
import FetchCommentsAction from '@/frameworks-drivers/comments/fetch-action';
import Idea from '@/enterprise-business-rules/entities/idea';
import Comment from '@/enterprise-business-rules/entities/comment';
import Link from 'next/link';

const IdeaDetail = () => {
    const [idea, setIdea] = useState<Idea>();
    const [comments, setComments] = useState<Comment[]>([]);

    const fetchIdea = async () => {
        const result = await FetchSharedAction();

        if (result.status === 200) {
            setIdea(result.data[0] as Idea);
        }
        if (result?.status !==200) {
            alert("投稿の読み込みに失敗しました。ログインしてください");
            redirect('/auth/login');
        }
    }
    const fetchComments = async () => {
        const idea_id = idea?.id ? idea.id : -1;
        const result = await FetchCommentsAction(idea_id);
        if (result.status === 200) {
            setComments(result.data as Comment[]);
        }
        if (result?.status !==200) {
            alert("コメントの読み込みに失敗しました。");
        }
    }

    useEffect(() => {
        fetchIdea();
    }, []);
    useEffect(() => {
        if (idea && idea.id && idea.id !== -1){
            fetchComments();
        }
    }, [idea?.id]);

    return (
        <>
            <main className='min-h-96 w-4/5 mx-auto'>
                <h3>コメント先のアイデア</h3>
                <ul className='flex flex-col shadow-md p-2 mb-16'>
                    <li>{idea?.title}</li>
                    <li>{idea?.content}</li>
                    <li className='text-right'>{idea?.priority_emoji}☺</li>
                    <li className='text-right'>
                        <Link
                            href={{
                                pathname: '/comments/create',
                                query: { idea_id: idea?.id }
                            }}
                            passHref
                            className=''
                        >コメントする</Link>
                    </li>
                </ul>
                <h3>コメント</h3>
                <ul className='flex flex-col shadow-md p-2'>
                {comments.map((comment, index) => (
                    <li key={index} className="p-1"> 
                        <p>{comment.content}</p>
                        <p>{comment.emotions}</p>
                    </li>
                ))}
                </ul>
            </main>
        </>
    );
}

export default IdeaDetail;