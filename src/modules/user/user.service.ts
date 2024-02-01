import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { UserDto } from './dto/user.args';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async join({ email, password }: UserDto): Promise<boolean> {
    const user = new User();
    user.email = email;
    user.password = password;

    await this.userRepository.save(user);

    return true;
  }

  async login({ email, password }: UserDto): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundError('Cannot find User');
    }
    console.log('login', user);
    return true;
  }

  async getUser(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundError(`Cannot find ${email}`);
    }
    return user;
  }
}
