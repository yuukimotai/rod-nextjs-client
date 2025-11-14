'use client'
import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';

import Comment from '@/enterprise-business-rules/entities/comment';
import FetchAction from '@/frameworks-drivers/mycomment/fetch-action';
import MyCommentDetail from './mycomment-detail';

const MyCommentsPage = () => {
    const [myComments, setMyComments] = useState<Comment[]>([]);
    const [selectedComment, setSelectedComment] = useState<Comment>();
    
    const fetchMyComments = async () => {
        const result = await FetchAction();
        if (result.status === 200) {
            setMyComments(result.data as Comment[]);
        }
        if (result?.status !==200) {
            alert("投稿の読み込みに失敗しました。ログインしてください");
            redirect('/auth/login');
        }
    }
    useEffect(() => {
        fetchMyComments();
    }, []);

    return (
        <>
            <main className='flex flex-row min-h-96 w-4/5 mx-auto'>
                <div className='w-1/2'>
                    <h3>My Comments Page</h3>
                    <ul className="">
                        <li className="p-6 overflow-y-scroll">
                            <ul>
                                {myComments.map((comment) => (
                                    <li key={comment.id} className='p-0.5 border border-cyan-300 rounded mb-2 flex justify-between items-center'>
                                        <h3 className='p-0.5 text-center'>{comment.content}</h3>
                                        <button className='border border-cyan-300 p-1 rounded' onClick={() => setSelectedComment(comment)}>詳細</button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </div>
                { selectedComment &&
                    <div className='w-1/2'>
                        <MyCommentDetail comment={selectedComment}/>
                    </div>
                }
            </main>
        </>
    );
}

export default MyCommentsPage;