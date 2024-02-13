import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.args';
import { hashingPassword, makeHashPassword } from '../../auth/crypto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser({ email, password }: UserDto): Promise<User> {
    const user = new User();
    user.email = email;
    const { salt, hashPassword } = makeHashPassword(password);
    user.salt = salt;
    user.password = hashPassword;

    try {
      return await this.userRepository.save(user);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('중복 아이디');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login({ email, password }: UserDto): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email });

    if (
      user &&
      (await hashingPassword(password, user.salt)) === user.password
    ) {
      return true;
    }

    throw new UnauthorizedException('비밀번호 또는 아이디가 잘못되었습니다.');
  }

  async getUser(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException(`Cannot find ${email}`);
    }
    return user;
  }

  async removeUser(email: string): Promise<void> {
    console.log(email);
    await this.userRepository.delete({ email });
  }
}
