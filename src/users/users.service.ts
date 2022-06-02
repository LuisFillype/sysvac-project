import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BCryptHashProvider } from 'src/providers/hashProdiver';
import { Not, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { FindUserDTO } from './dto/find-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
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

  async findAll(loggedUserId: string) {
    const userIsAdmin = await this.userRepository.findOne({
      where: {
        id: loggedUserId,
        function: UserFunction.ADMIN,
      },
    });

    if (!userIsAdmin) {
      throw new ForbiddenException('Does not have permission');
    }

    const allUsers = await this.userRepository.find({
      where: { id: Not(loggedUserId) },
    });

    return allUsers;
  }

  async create(createUserDTO: CreateUserDTO, loggedUserId: string) {
    const userIsAdmin = await this.userRepository.findOne({
      where: {
        id: loggedUserId,
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

  async update(loggedUserId: string, updateUserDTO: UpdateUserDTO, id: string) {
    const userLogged = await this.userRepository.findOne({
      where: { id: loggedUserId, function: UserFunction.ADMIN },
    });

    if (!userLogged) {
      throw new HttpException('Does not have permission', 403);
    }

    const userToUpdate = await this.userRepository.findOne({ where: { id } });

    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }

    if (
      userLogged.function !== UserFunction.ADMIN &&
      userToUpdate.id !== loggedUserId
    ) {
      throw new ForbiddenException('Does not have permission');
    }

    if (
      userLogged.function === UserFunction.ADMIN &&
      userToUpdate.id === userLogged.id
    ) {
      throw new ForbiddenException(
        'Does not have permission to change user function',
      );
    }

    if (updateUserDTO.function === UserFunction.ADMIN) {
      throw new ForbiddenException('Invalid Function');
    }

    if (updateUserDTO.email) {
      const emailIsAvaliable = await this.userRepository.findOne({
        where: { email: updateUserDTO.email, id: Not(id) },
      });

      if (emailIsAvaliable) {
        throw new BadRequestException('Email already exist');
      }
    }

    if (updateUserDTO.phone) {
      const phoneIsAvailable = await this.userRepository.findOne({
        where: { phone: updateUserDTO.phone, id: Not(id) },
      });

      if (phoneIsAvailable) {
        throw new BadRequestException('Phone already exist');
      }
    }

    Object.assign(userToUpdate, updateUserDTO);

    return await this.userRepository.save(userToUpdate);
  }
}
