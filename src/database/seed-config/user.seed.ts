import { UserFunction } from 'src/users/entities/users.entity';

export const UserAdminSeed = {
  name: 'admin',
  email: 'admin@email.com',
  cpf: '12345678901',
  password: '',
  phone: 'valid-phone-number',
  function: UserFunction.ADMIN,
  city: 'valid-city',
  district: 'valid-district',
  street: 'valid-street',
  number: 'valid-number',
  created_at: new Date(),
  updated_at: new Date(),
};
