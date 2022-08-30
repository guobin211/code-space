import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import { UserVM } from './user.vm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDTO): Promise<UserVM> {
    const result = await this.userRepository.create(dto);
    return UserVM.fromEntity(result);
  }
}
