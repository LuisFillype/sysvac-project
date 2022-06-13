import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vacina } from './entities/vacina.entity';

@Injectable()
export class VacinasService {
  constructor(
    @Inject('VACINA_REPOSITORY')
    private vacinaRepository: Repository<Vacina>,
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

    const vacinas = await this.vacinaRepository.find();

    console.log(vacinas);

    return;
  }
}
