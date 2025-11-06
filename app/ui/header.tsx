'use server';
import { cookies } from 'next/headers';
import LogoutButton from './logout-button';
import SwitchButton from './switch-button';


const Header = async () => {
    const cookieStore = cookies();
    const cookieValue = (await cookieStore).get('ignidea_isLoggedIn')?.value;
    const isLoggedIn = cookieValue === 'true' ? true : false;

    return (
        <>
            <header className="flex h-16 items-center justify-between bg-cyan-300 px-4 text-white mb-8">
                <h1 className="text-lg font-medium">IgnIdea</h1>
                <SwitchButton initialIsLoggedIn={isLoggedIn}/>
            </header>
        </>
    );
}

export default Header;