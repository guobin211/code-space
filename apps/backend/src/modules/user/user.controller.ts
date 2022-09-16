import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('user')
  @Post('user')
  async create(@Body('user') userData: CreateUserDTO) {
    return this.userService.create(userData);
  }
}
