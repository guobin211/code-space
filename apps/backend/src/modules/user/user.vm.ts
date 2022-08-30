import { dropProps } from 'src/utils/mapper';
import type { UserEntity } from './user.entity';

type UserProps = Omit<UserEntity, 'password' | 'hashPassword'> & {
  createAt: number;
};

export class UserVM implements UserProps {
  id: number;
  username: string;
  email: string;
  image: string;
  createAt: number;
  static fromEntity(entity: UserEntity): UserVM {
    return dropProps(entity, ['password', 'hashPassword']);
  }
}
