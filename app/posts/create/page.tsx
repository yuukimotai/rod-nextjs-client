import React from 'react';
import {
    PencilIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../../ui/button';
const PostsPage = () => {
    return (
        <>
            <main className='flex justify-center p-20'>
                <form className="space-y-3">
                    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                        <h1 className='mb-3 text-2xl'>
                            投稿作成
                        </h1>
                        <div className="w-full">
                            <div className="mt-4">
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="title">
                                    タイトル
                                </label>
                                <div className="relative">
                                    <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="title"
                                    type="text"
                                    name="title"
                                    placeholder="タイトルを入力"
                                    required
                                    minLength={6}
                                    />
                                    <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="content">
                                    内容
                                </label>
                                <div className="relative">
                                    <textarea
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        id="message" name="message" rows={5} cols={50}
                                        placeholder="内容を入力"
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

export default PostsPage;