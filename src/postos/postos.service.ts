import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User, UserFunction } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreatePostoDto } from './dto/create-posto.dto';
import { Posto } from './entities/postos.entity';

@Injectable()
export class PostosService {
  constructor(
    @Inject('POSTOS_REPOSITORY')
    private postoRepository: Repository<Posto>,
    @Inject('USERS_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  async create(createPostoDto: CreatePostoDto, userLogged: string) {
    const userIsAdmin = await this.userRepository.findOne({
      where: { id: userLogged, function: UserFunction.ADMIN },
    });

    if (!userIsAdmin) {
      throw new BadRequestException('Does not have permission');
    }

    const postoIsAvailable = await this.postoRepository.findOne({
      where: {
        cnpj: createPostoDto.cnpj,
      },
    });

    if (postoIsAvailable) {
      throw new BadRequestException('Posto already exists');
    }

    const postoNameIsAvailable = await this.postoRepository.findOne({
      where: { nome: createPostoDto.nome },
    });

    if (postoNameIsAvailable) {
      throw new BadRequestException('Posto name already exists');
    }

    const postoPhoneIsAvailable = await this.postoRepository.findOne({
      where: { phone: createPostoDto.phone },
    });

    if (postoPhoneIsAvailable) {
      throw new BadRequestException('Posto phone already exists');
    }

    const endressIsAvailable = await this.postoRepository.findOne({
      where: { endress: createPostoDto.endress },
    });

    if (endressIsAvailable) {
      throw new BadRequestException('Posto endress already exists');
    }

    const postoToRegistry = new Posto();
    postoToRegistry.cnpj = createPostoDto.cnpj;
    postoToRegistry.nome = createPostoDto.nome;
    postoToRegistry.phone = createPostoDto.phone;
    postoToRegistry.city = createPostoDto.endress.city;
    postoToRegistry.district = createPostoDto.endress.district;
    postoToRegistry.number = createPostoDto.endress.number;
    postoToRegistry.street = createPostoDto.endress.street;

    return this.postoRepository.save(postoToRegistry);
  }
}
