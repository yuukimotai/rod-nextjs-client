import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
import Header from '../ui/header';
import Footer from '../ui/footer';
 
const LoginPage = () => {
  return (
    <>
        <Header />
        <main className="flex items-center justify-center md:h-screen">
          <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
            <div className="flex h-20 w-full items-end rounded-lg bg-cyan-300 p-3 md:h-36">
              <div className="w-32md:w-36">
                <h1 className='text-white text-3xl font-bold'>IgnIdea</h1>
              </div>
            </div>
            <Suspense>
              <LoginForm />
            </Suspense>
          </div>
        </main>
        <Footer />
    </>
  );
}

export default LoginPage;