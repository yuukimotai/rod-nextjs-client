import React from 'react';
import LogoutButton from './logout-button';

const Header = () => {
    return (
        <>
            <header className="flex h-16 items-center justify-between border-b border-cyan-300 px-4">
                <h1 className="text-lg font-medium">IgnIdea</h1>
                <LogoutButton />
            </header>
        </>
    );
}

export default Header;