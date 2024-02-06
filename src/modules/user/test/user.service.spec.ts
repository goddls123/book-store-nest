import { Repository } from 'typeorm';
import { UserService } from '../user.service';
import { User } from '../entity/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

const userArray: User[] = [
  {
    id: 1,
    email: 'abc@abc.com',
    password: '123',
    salt: '12',
  },
  {
    id: 2,
    email: 'abc2@abc.com',
    password: '123',
    salt: '12',
  },
  {
    id: 3,
    email: 'abc3@abc.com',
    password: '123',
    salt: '12',
  },
];

const oneUser = {
  email: 'abc4@abc.com',
  password: '1234',
};
describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOneBy: jest.fn().mockResolvedValue(oneUser),
            save: jest.fn().mockResolvedValue(oneUser),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('createUser()', () => {
    it('should successfully insert a user', async () => {
      const oneUser = {
        email: 'abc4@abc.com',
        password: '1234',
      };

      expect(
        service.createUser({
          email: 'abc4@abc.com',
          password: '1234',
        }),
      ).resolves.toEqual(oneUser);
    });
  });
  describe('delete()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.removeUser('2');

      expect(removeSpy).toBeCalledWith({ email: '2' });
      expect(retVal).toBeUndefined();
    });
  });
});
