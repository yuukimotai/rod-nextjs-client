import type { AuthRepository } from '../../enterprise-business-rules/repositories/auth-repository';

class UnRegisterUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(jwt: string , password: string): Promise<{ status: number}> {
    // Repositoryに処理を委譲
    return await this.authRepo.unregister(jwt, password);
  }
}

export default UnRegisterUseCase;