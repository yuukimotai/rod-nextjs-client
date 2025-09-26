export interface AuthRepository {
  register(email: string, password: string, confirm: string): Promise<{status: number, jwt: string}>;
  login(email: string, password: string): Promise<{ status: number, jwt: string }>;
  logout(jwt: string): Promise<{ status: number}>;
  unregister(jwt: string, password: string): Promise<{status: number}>;
}