'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, redirect } from 'next/navigation';

import FetchSharedAction from '@/frameworks-drivers/shared/ideas/fetch-shared-action';
import Idea from '@/enterprise-business-rules/entities/idea';
import Link from 'next/link';

const IdeasPage = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [selectedIdea, setSelectedIdea] = useState<Idea>();
    const [viewDetail, setViewDetail] = useState<boolean>(false);

    const fetchIdeas = async () => {
        const result = await FetchSharedAction();
        if (result.status === 200) {
            setIdeas(result.data as Idea[]);
        }
        if (result?.status !==200) {
            alert("投稿の読み込みに失敗しました。ログインしてください");
            redirect('/auth/login');
        }
    }
    const selectIdea = (idea: Idea) => {
        setViewDetail(true);
        setSelectedIdea(idea);
    }
    const router = useRouter();
    const handleCreateIdea = () => {
        router.push("/ideas/create");
    }
    useEffect(() => {
        fetchIdeas();
    }, []);
    useEffect(() => {
    }, [selectedIdea]);
    return (
        <>
            <main className='min-h-96 w-4/5 mx-auto'>
                <h3>公開アイデア一覧</h3>
                <ul className='justify-center mx-auto'>
                    {ideas.map((idea) => (
                        <li key={idea.id} className='p-0.5 border border-cyan-300 rounded mb-2 flex justify-between items-center'>
                            <h3 className='p-0.5 text-center'>{idea.title}</h3>
                            <h3 className='p-0.5 text-center'>{idea.content}</h3>
                            <Link
                                href={{
                                    pathname: '/shared/ideas/detail',
                                    query: { idea_id: idea.id }
                                }}
                                passHref
                            >詳細</Link>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    );
}

export default IdeasPage;