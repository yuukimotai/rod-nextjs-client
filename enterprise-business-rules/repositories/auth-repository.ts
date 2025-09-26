export interface AuthRepository {
  createAccount(email: string, password: string, confirm: string): Promise<{status: number, jwt: string}>;
  login(email: string, password: string): Promise<{ status: number, jwt: string }>;
  logout(jwt: string): Promise<{ status: number}>;
  closeAccount(jwt: string, password: string): Promise<{status: number}>;
}