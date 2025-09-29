import {AxiosResponse} from 'axios';

export interface AuthRepository {
  register(email: string, password: string, confirm: string): Promise<{status: number, jwt: string}>;
  login(email: string, password: string): Promise<{ status: number, jwt: string }>;
  logout(jwt: string): Promise<AxiosResponse | undefined>;
  unregister(jwt: string, password: string): Promise<{status: number}>;
}