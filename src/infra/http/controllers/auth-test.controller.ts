import { Controller, Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('/auth')
export class AuthTestController {
  constructor(private jwtService: JwtService) {}

  @Get()
  generateTestToken() {
    const payload = {
      sub: 'test-user-123',
      email: 'test@example.com',
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      usage: `Authorization: Bearer ${token}`,
      testUserId: 'test-user-123',
    };
  }
}
