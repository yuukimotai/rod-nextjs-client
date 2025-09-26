import type { AuthRepository } from '../../enterprise-business-rules/repositories/auth-repository';

class LogoutUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(jwt: string): Promise<{ status: number; }> {
    return await this.authRepo.logout(jwt);
  }
}

export default LogoutUseCase;