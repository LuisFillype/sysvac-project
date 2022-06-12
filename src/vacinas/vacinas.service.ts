import { Inject, Injectable } from '@nestjs/common';
import { async } from 'rxjs';
import { Repository } from 'typeorm';
import { UserVacs } from './entities/user-vacs.entity';
import { Vacina } from './entities/vacina.entity';

@Injectable()
export class VacinasService {
  constructor(
    @Inject('VACINA_REPOSITORY')
    private vacinaRepository: Repository<Vacina>,
    @Inject('USER_VACS_REPOSITORY')
    private vacinaUserRepository: Repository<UserVacs>,
  ) {}

  async test() {
    const vacina = new Vacina();
    vacina.descricao = 'vacina';
    vacina.doses = 1;
    vacina.intervalo = '2';
    vacina.nome = 'vacina';

    const vacina2 = new Vacina();
    vacina2.descricao = 'vacina2';
    vacina2.doses = 2;
    vacina2.intervalo = '3';
    vacina2.nome = 'vacina2';

    const userVac = new UserVacs();
    userVac.numero_dose = 1;
    userVac.vacinas = [vacina, vacina2];

    await this.vacinaRepository.save(vacina);
    await this.vacinaRepository.save(vacina2);
    await this.vacinaUserRepository.save(userVac);

    const vacinas = await this.vacinaRepository.find();

    console.log(vacinas);

    return;
  }
}
