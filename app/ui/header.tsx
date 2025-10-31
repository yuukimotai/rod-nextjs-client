"use client";

import React, { useState, useEffect } from 'react';
import LogoutButton from './logout-button';

type Props = {
  jwtString: string | undefined;
};

const Header = ({ jwtString }: Props) => {
    const [jwt, setJwt] = useState<string | undefined>(undefined);
    
    useEffect(() => {
        setJwt(jwtString);
    }, []);

    return (
        <>
            <header className="flex h-16 items-center justify-between bg-cyan-300 px-4 text-white">
                <h1 className="text-lg font-medium">IgnIdea</h1>
                {jwt !== undefined && <LogoutButton />}
            </header>
        </>
    );
}

export default Header;