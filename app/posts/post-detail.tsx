'use client'
import React, { useState, useEffect } from 'react';
import Post from '@/enterprise-business-rules/entities/post';
import UpdatePostButton from './ui/update-post-button';
import DeletePostButton from './ui/delete-post-button';

interface Props {
    post: Post;
}

const PostDetail = ({post}: Props) => {
    const [title, setTitle] = useState<string>(post.title ? post.title : "");
    const [content, setContent] = useState<string>(post.content ? post.content : "");
    const inputTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        post.title = e.target.value;
    }
    const inputContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        post.content = e.target.value;
    }

    return(
        <>
            <div className='border border-cyan-300 rounded min-h-80'>
                <ul className='flex flex-col'>
                    <li className='border border-cyan-300 rounded m-1'>
                        <input type="text" className='w-full' value={title} onChange={inputTitleChange} />
                    </li>
                    <li className='border border-cyan-300 rounded m-1 min-h-40'>
                        <textarea name="content" id="content" className='w-full' value={content} onChange={inputContentChange} ></textarea>
                    </li>
                </ul>
                <ul className='flex flex-row justify-end m-1 space-x-2'>
                    <li>
                        <DeletePostButton post={post} />
                    </li>
                    <li>
                        <UpdatePostButton post={post} />
                    </li>
                </ul>
            </div>
        </>
    )
}

export default PostDetail;