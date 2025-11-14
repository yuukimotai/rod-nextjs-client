'use client'
import React from "react";
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { Button } from '../../ui/button';
import Comment from "@/enterprise-business-rules/entities/comment";
import UpdateAction from '@/frameworks-drivers/mycomment/update-action';

interface Props {
    comment: Comment | undefined;
}

const UpdateMyCommentButton = ({comment}: Props) => {
    const handleUpdate = async () => {
        console.log(comment)
        const commentId = comment?.id ? comment.id : -1;
        const content = comment?.content ? comment.content : "";
        
        if (commentId === -1) {
            alert("comment ID が無効です");
            return;
        }
        if (content.trim() === "") {
            alert("タイトルまたは内容が空です");
            return;
        }
        const result = await UpdateAction(commentId, content);
        if (result.status === 200) {
            alert(`comment ${comment?.id} を更新しました`);
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

export default UpdateMyCommentButton;