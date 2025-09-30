'use server';

import { cookies } from 'next/headers';
import RegisterUseCase from '@/application-business-rules/auth/register-usecase';
import  AuthRepository from '@/interface-adapters/http-auth-repository';

const RegisterAction = async (email: string, password: string, confirm: string): Promise<{status: number, jwt: string}> => {
    const cookieStore = cookies();
    const authRepository = new AuthRepository();
    const registerUseCase = new RegisterUseCase(authRepository);
    const result = await registerUseCase.execute(email, password, confirm); 
  
    (await cookieStore).set('ignidea_bearer', result.jwt, { httpOnly: true, path: '/' });
    return {status: result.status, jwt: result.jwt}
}

export default RegisterAction;