'use client'
import React, { useState, useEffect } from 'react';
import Idea from '@/enterprise-business-rules/entities/idea';
import UpdateIdeaButton from './ui/update-idea-button';
import DeleteIdeaButton from './ui/delete-idea-button';

interface Props {
    idea: Idea;
}

const IdeaDetail = ({idea}: Props) => {
    const [title, setTitle] = useState<string>(idea.title ? idea.title : "");
    const [content, setContent] = useState<string>(idea.content ? idea.content : "");
    const [isPublic , setIsPublic] = useState<boolean>(idea.is_public ? idea.is_public : false);
    const inputTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        idea.title = e.target.value;
    }
    const inputContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        idea.content = e.target.value;
    }
    const isPublicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPublic(e.target.checked);
        idea.is_public = e.target.checked;
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
                <div className='flex flex-row justify-center'>
                    <p>公開: </p><input type='checkbox' name="content" id="content" checked={isPublic} onChange={isPublicChange}/>
                </div>
                <ul className='flex flex-row justify-end m-1 space-x-2'>
                    <li>
                        <DeleteIdeaButton idea={idea} />
                    </li>
                    <li>
                        <UpdateIdeaButton idea={idea} />
                    </li>
                </ul>
            </div>
        </>
    )
}

export default IdeaDetail;