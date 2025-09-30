'use server';

import { cookies } from 'next/headers';
import UnRegisterUseCase from '@/application-business-rules/auth/unregister-usecase';
import  AuthRepository from '@/interface-adapters/http-auth-repository';

const UnRegisterAction = async (email: string, password: string): Promise<{status: number, jwt: string}> => {
    const cookieStore = cookies();
    const authRepository = new AuthRepository();
    const unregisterUseCase = new UnRegisterUseCase(authRepository);
    const result = await unregisterUseCase.execute(email, password); 
  
    (await cookieStore).delete('ignidea_bearer');
    return {status: result.status, jwt: ""}
}

export default UnRegisterAction;