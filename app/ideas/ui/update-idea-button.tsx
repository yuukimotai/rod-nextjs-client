'use client'
import React from "react";
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { Button } from '../../ui/button';
import Idea from "@/enterprise-business-rules/entities/idea";
import UpdateAction from '@/frameworks-drivers/ideas/update-action';

interface Props {
    idea: Idea;
}

const UpdateIdeaButton = ({idea}: Props) => {
    const handleUpdate = async () => {
        console.log(idea)
        const ideaId = idea.id ? idea.id : -1;
        const title = idea.title ? idea.title : "";
        const content = idea.content ? idea.content : "";
        const isPublic = idea.is_public ? idea.is_public : false;
        
        if (ideaId === -1) {
            alert("Idea ID が無効です");
            return;
        }
        if (title.trim() === "" || content.trim() === "") {
            alert("タイトルまたは内容が空です");
            return;
        }
        const result = await UpdateAction(ideaId, title, content, isPublic);
        if (result.status === 200) {
            alert(`Post ${idea.id} を更新しました`);
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

export default UpdateIdeaButton;