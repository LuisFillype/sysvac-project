import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import BCryptHashProvider from 'src/providers/hashProdiver';
import JWTProvider from 'src/providers/jwtProvider';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateSessionDTO } from './dto/create-session.dto';

@Injectable()
export class SessionService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: Repository<User>,
    private bcryptHashProvider: BCryptHashProvider,
    private jwtProvider: JWTProvider,
  ) {}

  async findLogin(createSessionDTO: CreateSessionDTO) {
    const hasUser = await this.userRepository.findOne({
      where: {
        email: createSessionDTO.email,
      },
    });

    const isPasswordSame = await this.bcryptHashProvider.compare(
      createSessionDTO.password,
      hasUser.password,
    );

    if (!hasUser) {
      throw new HttpException('Wrong credentials', HttpStatus.FORBIDDEN);
    }

    if (!isPasswordSame) {
      throw new HttpException('Wrong credentials', HttpStatus.FORBIDDEN);
    }

    const jwtToken = this.jwtProvider.generateToken(hasUser.id);

    return {
      user: hasUser,
      jwtToken,
    };
  }
}
