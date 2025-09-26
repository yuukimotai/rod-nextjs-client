"use client";

import React from 'react';
import { useCookies } from 'react-cookie';
import LogoutButton from './logout-button';

const Header = () => {
    const [cookie, setCookie, removeCookie] = useCookies(["ignidea_bearer"]);
        
    return (
        <>
            <header className="flex h-16 items-center justify-between border-b border-cyan-300 px-4">
                <h1 className="text-lg font-medium">IgnIdea</h1>
                {cookie?.ignidea_bearer && <LogoutButton />}
            </header>
        </>
    );
}

export default Header;