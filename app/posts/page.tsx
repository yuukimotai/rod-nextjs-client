'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, redirect } from 'next/navigation';

import Post from '@/enterprise-business-rules/entities/post';
import FetchAction from '@/frameworks-drivers/posts/fetch-action';
import PostDetail from '@/app/posts/post-detail';

const PostsPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post>();
    const [viewDetail, setViewDetail] = useState<boolean>(false);

    const fetchPosts = async () => {
        const result = await FetchAction();
        if (result.status === 200) {
            setPosts(result.data as Post[]);
        }
        if (result?.status !==200) {
            alert("投稿の読み込みに失敗しました。ログインしてください");
            redirect('/auth/login');
        }
    }
    const selectPost = (post: Post) => {
        setViewDetail(true);
        setSelectedPost(post);
    }
    useEffect(() => {
        fetchPosts();
    }, []);
    useEffect(() => {
    }, [selectedPost]);
    return (
        <>
            <main className='min-h-96'>
                <div className='p-6'>投稿一覧</div>
                <ul className="flex flex-row">
                    <li className="w-3/12 p-6 overflow-y-scroll">
                        <ul>
                            {posts.map((post) => (
                                <li key={post.id} className='p-0.5 border border-cyan-300 rounded mb-2 flex justify-between items-center'>
                                    <h3 className='p-0.5 text-center'>{post.title}</h3>
                                    <button type="button" onClick={()=> selectPost(post)} className='p-0.5 text-right border border-cyan-300'>詳細</button>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="w-9/12 p-6">
                        {viewDetail && selectedPost && (<PostDetail key={selectedPost.id} post={selectedPost} />)}
                    </li>
                </ul>
            </main>
        </>
    );
}

export default PostsPage;