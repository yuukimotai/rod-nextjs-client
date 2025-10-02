'use client'
import React from "react";
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { Button } from '../../ui/button';
import Post from "@/enterprise-business-rules/entities/post";
import UpdateAction from '@/frameworks-drivers/posts/update-action';

interface Props {
    post: Post;
}

const UpdatePostButton = ({post}: Props) => {
    const handleUpdate = async () => {
        console.log(post)
        const postId = post.id ? post.id : -1;
        const title = post.title ? post.title : "";
        const content = post.content ? post.content : "";
        
        if (postId === -1) {
            alert("Post ID が無効です");
            return;
        }
        if (title.trim() === "" || content.trim() === "") {
            alert("タイトルまたは内容が空です");
            return;
        }
        const result = await UpdateAction(postId, title, content);
        if (result.status === 200) {
            alert(`Post ${post.id} を更新しました`);
            location.reload();
        }
    }

    return (
        <>
            <Button onClick={handleUpdate}>
                更新
            </Button>
        </>
    )
} 

export default UpdatePostButton;