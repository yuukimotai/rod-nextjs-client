"use client";
import LogoutButton from './logout-button';
import LoginButton from './login-button';

type Props = {
  initialIsLoggedIn: boolean;
};

const SwitchButton =({ initialIsLoggedIn }: Props) => {
  return (
    <>
      {initialIsLoggedIn ? <LogoutButton /> : <LoginButton />}
    </>
  );
}

export default SwitchButton;