import { AxiosResponse } from 'axios';
import type { AuthRepository } from '../../enterprise-business-rules/repositories/auth-repository';

class LogoutUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(jwt: string): Promise<AxiosResponse | undefined> {
    const response = await this.authRepo.logout(jwt);
    if (response) {
      return response;
    } else {
      return undefined;
    }
  }
}

export default LogoutUseCase;