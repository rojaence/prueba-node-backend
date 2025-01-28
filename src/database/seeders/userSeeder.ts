// scripts/seedUsers.ts
import { User } from '@database/initDatabase';
import { database } from '@database/initDatabase';
import { UserCreateDTO } from '@user/user.model';
import BcryptHash from "@utils/bcryptHash";

export async function seedUsers() {
  try {
    // Conecta con la base de datos
    await database.sequelize.authenticate();

    // Crea varios usuarios de ejemplo
    const users: UserCreateDTO[] = [
      {
        username: 'johndoe1',
        password: await BcryptHash.genPasswordHash('admin1234'),
        sessionActive: false,
        email: 'johndoe@example.com',
        status: true,
        firstName: 'john',
        middleName: 'carl',
        firstLastname: 'doe',
        secondLastname: 'smith',
        idCard: '0123456789',
        birthDate: new Date('1988-02-20'),
      }
    ];

    // Inserta los usuarios en la base de datos
    await User.bulkCreate(users, { validate: true });
    console.log('Usuarios insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar usuarios:', error);
  } finally {
    await database.sequelize.close()
    console.log('Conexión a la base de datos cerrada.');
  }
}
