import { dropProps } from 'src/utils/mapper';
import type { UserEntity } from './user.entity';

export type UserVM = Omit<UserEntity, 'password' | 'hashPassword'> & {
  createAt: number;
};

export function buildUserVM(user: UserEntity): UserVM {
  return dropProps(user, 'password', 'hashPassword');
}
