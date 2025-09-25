import React from 'react';

const LogoutButton = () => {
    return (
        <>
            <button className="flex h-10 items-center rounded-lg bg-cyan-300 px-4 text-sm font-medium text-white transition-colors hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 active:bg-cyan-400 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
                Logout
            </button>
        </>
    )
};

export default LogoutButton;