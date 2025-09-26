import type { AuthRepository } from '../../enterprise-business-rules/repositories/auth-repository';

class RegisterUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(email: string, password: string, confirm: string): Promise<{ status: number; jwt: string }> {
    // Repositoryに処理を委譲
    return await this.authRepo.register(email, password, confirm); // 実際はemail/password渡すように修正する
  }
}

export default RegisterUseCase;