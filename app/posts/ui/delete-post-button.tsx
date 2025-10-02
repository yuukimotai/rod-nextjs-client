import React from "react";
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { Button } from '../../ui/button';
import Post from "@/enterprise-business-rules/entities/post";
import DeleteAction from '@/frameworks-drivers/posts/delete-action';

interface Props {
    post: Post;
}

const DeletePostButton = ({post}: Props) => {
    const postId = post.id ? post.id : -1;
    let result = {status: 500, title: ""}
    const handleDelete = async () => {
        if (postId === -1) {
            alert("Post ID が無効です");
            return;
        }
        result = await DeleteAction(postId);
        if (result.status === 204) {
            alert(`Post ID ${post.id} 削除しました`);
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

export default DeletePostButton;