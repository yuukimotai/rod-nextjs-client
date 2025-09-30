'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, redirect } from 'next/navigation';

import Post from '@/enterprise-business-rules/entities/post';
import FetchAction from '@/frameworks-drivers/posts/fetch-action';
import PostDetail from '@/app/posts/post-detail';

const PostsPage = () => {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post>(new Post());
    const [viewDetail, setViewDetail] = useState<boolean>(false);

    const fetchPosts = async () => {
        const result = await FetchAction();
        if (result.status === 200) {
            setPosts(result.data as Post[]);
            alert("自分の投稿を読み込みました");
        }
        if (result?.status !==200) {
            console.log(result?.status)
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
            <h1>Posts Page</h1>
            <ul className="flex flex-row max-h-96">
                <li className="w-3/12 overflow-y-scroll">
                    <ul>
                        {posts.map((post) => (
                            <li key={post.id}>
                                <h3>{post.title}</h3>
                                <button type="button" onClick={()=> selectPost(post)}>詳細</button>
                            </li>
                        ))}
                    </ul>
                </li>
                <li className="w-9/12">
                    {viewDetail && (<PostDetail />)}
                </li>
            </ul>
        </>
    );
}

export default PostsPage;