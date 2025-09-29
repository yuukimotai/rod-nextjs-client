"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import  AuthRepository from '../../interface-adapters/http-auth-repository';
import LogoutUsecase from '../../application-business-rules/auth/logout-usecase';

const LogoutButton = () => {
        const router = useRouter();
        const handleSubmit = async () => {
            const authRepository = new AuthRepository();
            const logoutUsecase = new LogoutUsecase(authRepository);
            // console.log(result);
            // if (result.status === 200) {
            //     removeCookie("ignidea_bearer");
            //     alert('ログアウトしました');
            //     router.push("/");
            // }
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