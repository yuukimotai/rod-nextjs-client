'use server';

import { cookies } from 'next/headers';
import LoginUsecase from '@/application-business-rules/auth/login-usecase';
import  AuthRepository from '@/interface-adapters/http-auth-repository';

const LoginAction = async (email: string, password: string): Promise<{status: number, jwt: string}> => {
    const cookieStore = cookies();
    const authRepository = new AuthRepository();
    const loginUseCase = new LoginUsecase(authRepository);
    const result = await loginUseCase.execute(email, password); 
  
    (await cookieStore).set('ignidea_bearer', result.jwt, { httpOnly: true, path: '/' });
    return {status: result.status, jwt: result.jwt}
}

export default LoginAction;