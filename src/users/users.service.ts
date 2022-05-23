import { Inject, Injectable } from '@nestjs/common';
import BCryptHashProvider from 'src/providers/hashProdiver';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: Repository<User>,
    private bcryptHash: BCryptHashProvider,
  ) {}

  async findOne() {
    return;
  }

  async create(createUserDTO: CreateUserDTO) {
    // const userIsAdmin = await
    const hasUser = await this.userRepository.findOne({
      where: {
        email: createUserDTO.email,
      },
    });
    const response = new User();
    response.name = createUserDTO.name;
    response.cpf = createUserDTO.cpf;
    response.email = createUserDTO.email;
    response.phone = createUserDTO.phone;
    response.city = createUserDTO.endress.city;
    response.street = createUserDTO.endress.street;
    response.district = createUserDTO.endress.district;
    response.number = createUserDTO.endress.number;
    response.function = createUserDTO.function;
    response.password = await this.bcryptHash.generate(createUserDTO.password);

    return this.userRepository.save(response);
  }
}
