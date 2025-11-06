'use server'

import { cookies } from 'next/headers';
import LogoutUseCase from '@/application-business-rules/auth/logout-usecase';
import  AuthRepository from '@/interface-adapters/http-auth-repository';
import { AxiosResponse } from 'axios';
import { revalidatePath } from 'next/cache';

const LogoutAction = async (): Promise<{ status: number }> =>{
    const cookieStore = cookies();
    const authRepository = new AuthRepository();
    const logoutUseCase = new LogoutUseCase(authRepository);
    const jwt = (await cookieStore).get('ignidea_bearer');
    let result: AxiosResponse | undefined;
    
    if (jwt) {
        result = await logoutUseCase.execute(jwt.value);
    }
    if (result) {
        (await cookieStore).delete('ignidea_bearer');
        (await cookieStore).set('ignidea_isLoggedIn', 'false');
        return {status: result.status}
    } else {
        return { status: 500 }
    }
}

export default LogoutAction;