'use client'
import React, { useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import {
    PencilIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../../ui/button';
import CreateAction from '@/frameworks-drivers/comments/create-action';

interface Props {
  params: {
    idea_id: string;
  };
}

const CommentPage = (props: Props) => {
    const params = useSearchParams();
    const idea_id = params.get('idea_id');
    const idea_num = idea_id ? parseInt(idea_id) : 0;
    const [content, setContent] = useState<string>("");

    const inputContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }
    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        const result = await CreateAction(idea_num, content);
        if (result.status === 201) {
            alert('コメントしました');
            redirect("/mycomments");
        }
    }

    return (
        <>
            <main className='flex justify-center p-20'>
                <form className="space-y-3" onSubmit={handleCreate}>
                    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                        <h1 className='mb-3 text-2xl'>
                            コメント作成
                        </h1>
                        <div className="w-full">
                            <div className="mt-4">
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="content">
                                    内容
                                </label>
                                <div className="relative">
                                    <textarea
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        id="content" name="content" rows={5} cols={50}
                                        placeholder="内容を入力"
                                        onChange={inputContentChange} value={content}
                                        required/>
                                    <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>
                        <Button className="mt-4 w-full bg-cyan-300 hover:bg-cyan-400">
                            投稿 <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                        </Button>
                    </div>
                </form>
            </main>
        </>
    );
}

export default CommentPage;