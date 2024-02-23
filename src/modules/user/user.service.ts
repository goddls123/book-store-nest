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
import { jwtTokenResponse } from './response/jwtToken.response';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async createUser({ email, password }: UserDto): Promise<User> {
    const user = new User();
    user.email = email;
    const { salt, hashPassword } = this.authService.makeHashPassword(password);
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

  async login({ email, password }: UserDto): Promise<jwtTokenResponse> {
    const user = await this.userRepository.findOneBy({ email });
    if (
      user &&
      (await this.authService.hashingPassword(password, user.salt)) ===
        user.password
    ) {
      const respond = new jwtTokenResponse();
      const payload = { id: user.id, email: user.email };
      const { accessToken, refreshToken } =
        this.authService.createToken(payload);

      await this.userRepository.update({ id: user.id }, { refreshToken });

      respond.accessToken = accessToken;
      respond.refreshToken = refreshToken;
      respond.email = user.email;
      respond.id = user.id;

      return respond;
    }

    throw new UnauthorizedException('비밀번호 또는 아이디가 잘못되었습니다.');
  }

  async updateRefreshToken(
    email: string,
    refreshToken: string,
  ): Promise<boolean> {
    await this.userRepository.update({ email }, { refreshToken });
    return true;
  }

  async findUserByRefreshToken(refreshToken: string): Promise<User> {
    return await this.userRepository.findOneBy({ refreshToken });
  }
  async getUser(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException(`Cannot find ${email}`);
    }
    return user;
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async removeUser(email: string): Promise<void> {
    console.log(email);
    await this.userRepository.delete({ email });
  }
  async removeRefreshToken(email: string) {
    await this.userRepository.update({ email }, { refreshToken: null });

    return true;
  }
  async updatePassword(userDto: UserDto): Promise<boolean> {
    const { hashPassword, salt } = this.authService.makeHashPassword(
      userDto.password,
    );

    await this.userRepository.update(
      { email: userDto.email },
      { password: hashPassword, salt },
    );
    return true;
  }
}
