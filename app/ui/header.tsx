"use client";

import React, { useState, useEffect } from 'react';
import {atom, useAtom} from 'jotai';
import LogoutButton from './logout-button';

const cookieAtom = atom<boolean>();

type HeaderProps = {
    jwtString: string
}

const Header = (props: HeaderProps) => {
  const [loginFlag, setLoginFlag] = useAtom(cookieAtom);
  if (props.jwtString !== "") { setLoginFlag(true) }

  return (
        <>
            <header className="flex h-16 items-center justify-between bg-cyan-300 px-4 text-white">
                <h1 className="text-lg font-medium">IgnIdea</h1>
                { loginFlag === true && <LogoutButton />}
            </header>
        </>
    );
}

export default Header;