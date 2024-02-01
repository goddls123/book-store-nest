import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async join(email: string, password: string) {
    const user = new User();
    user.email = email;
    user.password = password;

    await this.userRepository.save(user);

    return true;
  }

  login() {}

  async getUser(email: string) {
    const user = await this.userRepository.findOneBy({ email: email });

    if (!user) {
      throw new NotFoundError(`Cannot find ${email}`);
    }
    return user;
  }
}
