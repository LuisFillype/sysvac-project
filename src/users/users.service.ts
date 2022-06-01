import {
  ForbiddenException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BCryptHashProvider } from 'src/providers/hashProdiver';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { FindUserDTO } from './dto/find-user.dto';
import { User, UserFunction } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: Repository<User>,
    private bcryptHash: BCryptHashProvider,
  ) {}

  async findOne(loggedUserId: string, { cpf }: FindUserDTO) {
    const userIsAdmin = await this.userRepository.findOne({
      where: { id: loggedUserId, function: UserFunction.ADMIN },
    });

    if (!userIsAdmin) {
      throw new HttpException('Does not have permission', 403);
    }

    const userToFind = await this.userRepository.findOne({
      where: { cpf },
    });

    if (!userToFind) {
      throw new HttpException('User not found', 404);
    }
    return userToFind;
  }

  async create(createUserDTO: CreateUserDTO, userIdLogged: string) {
    const userIsAdmin = await this.userRepository.findOne({
      where: {
        id: userIdLogged,
        function: UserFunction.ADMIN,
      },
    });

    if (!userIsAdmin) {
      throw new HttpException('Cannot create a user', 400);
    }

    if (
      UserFunction.ADMIN == createUserDTO.function ||
      !Object.values(UserFunction).includes(createUserDTO.function)
    ) {
      throw new HttpException('Invalid user function', 403);
    }

    const hasUser = await this.userRepository.findOne({
      where: {
        cpf: createUserDTO.cpf,
      },
    });

    if (hasUser) {
      throw new ForbiddenException('User already exist');
    }
    const emailIsAvaliable = await this.userRepository.findOne({
      where: {
        email: createUserDTO.email,
      },
    });
    if (emailIsAvaliable) {
      throw new ForbiddenException('Email already exist');
    }

    const phoneIsAvailable = await this.userRepository.findOne({
      where: { phone: createUserDTO.phone },
    });

    if (phoneIsAvailable) {
      throw new ForbiddenException('Phone already exist');
    }

    const userToRegistry = new User();

    userToRegistry.name = createUserDTO.name;
    userToRegistry.cpf = createUserDTO.cpf;
    userToRegistry.email = createUserDTO.email;
    userToRegistry.phone = createUserDTO.phone;
    userToRegistry.city = createUserDTO.endress.city;
    userToRegistry.street = createUserDTO.endress.street;
    userToRegistry.district = createUserDTO.endress.district;
    userToRegistry.number = createUserDTO.endress.number;
    userToRegistry.function = createUserDTO.function;
    userToRegistry.password = await this.bcryptHash.generate(
      createUserDTO.password,
    );

    return this.userRepository.save(userToRegistry);
  }
}
