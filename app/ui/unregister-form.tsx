'use client';

import React, { useState } from 'react';
import { redirect } from 'next/navigation';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useAuth } from '@/app/ui/auth-provider';
import UnRegister from '@/frameworks-drivers/auth/unregister-action';
import User from '../../enterprise-business-rules/entities/user';

export default function UnRegisterForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { jwtString } = useAuth();
    let result = {status: 500, jwt: ""}
    
    const inputEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const inputPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        const user = new User();
        //念のための型チェック
        user.email = email;
        user.password = password;
        if (jwtString) {
           result = await UnRegister(jwtString, user.password);
        } else {
          alert("認証されていません。ログインしてください")
          redirect('/auth/login')
        }
        if (result.status === 200) {
            // Postへのナビゲートとアラートメッセージ忘れず
            alert('退会しました');
            redirect('/auth/login');
        }
    };

  return (
    <>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className='mb-3 text-2xl'>
              退会フォーム
          </h1>
          <div className="w-full">
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                  onChange={inputPasswordChange}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <Button className="mt-4 w-full bg-cyan-300 hover:bg-cyan-400">
            退会 <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </Button>
        </div>
      </form>
    </>
  );
}