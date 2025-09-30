import Post from '@/enterprise-business-rules/entities/post';
import React from 'react';

interface Props {
    post: Post;
}

const PostDetail = ({post}: Props) => {

    return(
        <>
            <div className='border border-cyan-300 rounded min-h-80'>
                <ul className='flex flex-col'>
                    <li className='border border-cyan-300 rounded m-1'>
                        <input type="text" value={post.title} className='w-full'/>
                    </li>
                    <li className='border border-cyan-300 rounded m-1 min-h-40'>
                        <textarea name="content" id="content" className='w-full'>{post.content}</textarea>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default PostDetail;