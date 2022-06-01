import { BCryptHashProvider } from 'src/providers/hashProdiver';
import { UserFunction } from 'src/users/entities/users.entity';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { UserAdminSeed } from '../seed-config/user.seed';

export class CreateUserAdmin1645560482406 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<any> {
    UserAdminSeed.password = await new BCryptHashProvider().generate('12345');
    await getRepository('users', 'seed').save(UserAdminSeed);
  }

  public async down(_: QueryRunner): Promise<any> {
    await getRepository('users', 'seed').delete({
      email: UserAdminSeed.email,
      function: UserFunction.ADMIN,
    });
  }
}
