import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { IsEmail } from 'class-validator';
import { createHmac } from 'crypto';

const secret = 'amd_psd';
export async function hashName(name: string) {
  return createHmac('md5', secret).update(name).digest('hex');
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ default: '' })
  image: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashName(this.password);
  }
}
