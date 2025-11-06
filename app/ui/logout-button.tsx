"use client";

import React from 'react';
import { useRouter, redirect} from "next/navigation";
import LogoutAction from '@/frameworks-drivers/auth/logout-action';

const LogoutButton = () => {
        const handleSubmit = async () => {
            const result = await LogoutAction();
            if (result.status === 200) {
                alert('ログアウトしました');
                redirect("/auth/login");
            } else {
                alert('ログアウトに失敗しました。もう一度お試しください。');
            }
        }

    return (
        <>
            <button type="button" onClick={handleSubmit} className="flex h-10 items-center rounded-lg bg-cyan-300 px-4 text-sm font-medium text-white transition-colors hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 active:bg-cyan-400 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
                Logout
            </button>
        </>
    )
};

export default LogoutButton;