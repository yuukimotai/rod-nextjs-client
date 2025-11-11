'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, redirect } from 'next/navigation';

import Idea from '@/enterprise-business-rules/entities/idea';
import FetchAction from '@/frameworks-drivers/ideas/fetch-action';
import IdeaDetail from '@/app/ideas/idea-detail';

const IdeasPage = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [selectedIdea, setSelectedIdea] = useState<Idea>();
    const [viewDetail, setViewDetail] = useState<boolean>(false);

    const fetchIdeas = async () => {
        const result = await FetchAction();
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
                <div className="flex justify-between mx-auto p-8">
                    <h3 className="text-3xl font-bold mb-6">アイデア一覧</h3>
                    <a onClick={handleCreateIdea} className="flex h-10 items-center rounded-lg bg-cyan-300 px-4 text-sm font-medium text-white transition-colors hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 active:bg-cyan-400 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
                        新規作成
                    </a>
                </div>
                <ul className="flex flex-row">
                    <li className="w-3/12 p-6 overflow-y-scroll">
                        <ul>
                            {ideas.map((idea) => (
                                <li key={idea.id} className='p-0.5 border border-cyan-300 rounded mb-2 flex justify-between items-center'>
                                    <h3 className='p-0.5 text-center'>{idea.title}</h3>
                                    <button type="button" onClick={()=> selectIdea(idea)} className='p-0.5 text-right border border-cyan-300'>詳細</button>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="w-9/12 p-6">
                        {viewDetail && selectedIdea && (<IdeaDetail key={selectedIdea.id} idea={selectedIdea} />)}
                    </li>
                </ul>
            </main>
        </>
    );
}

export default IdeasPage;