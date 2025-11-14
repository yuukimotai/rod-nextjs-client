import React from "react";
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { Button } from '../../ui/button';
import Comment from "@/enterprise-business-rules/entities/comment";
import DeleteAction from '@/frameworks-drivers/mycomment/delete-action';

interface Props {
    comment: Comment | undefined;
}

const DeleteMyCommentButton = ({comment}: Props) => {
    const commentId = comment?.id ? comment?.id : -1;
    let result = {status: 500, title: ""}
    const handleDelete = async () => {
        if (commentId === -1) {
            alert("Comment ID が無効です");
            return;
        }
        result = await DeleteAction(commentId);
        if (result.status === 204) {
            alert(`Comment ID ${commentId} 削除しました`);
            location.reload();
        }
    }

    return (
        <Button className='flex h-10 items-center rounded-lg bg-rose-300 px-4 text-sm font-medium text-white transition-colors hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:bg-rose-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
            onClick={handleDelete}>
            削除
        </Button>
    )
}

export default DeleteMyCommentButton;