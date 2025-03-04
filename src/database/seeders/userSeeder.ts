// scripts/seedUsers.ts
import { Role, RoleUser, User } from '@database/initDatabase';
import { database } from '@database/initDatabase';
import { RoleEnum } from '@enums/roleEnum';
import { UserCreateDTO } from '@user/user.model';
import BcryptHash from "@utils/bcryptHash";

export async function seedUsers() {
  try {
    // Conecta con la base de datos
    await database.sequelize.authenticate();

    const adminRole = await Role.findOne({
      where: {
        name: RoleEnum.Admin
      }
    })

    const userRole = await Role.findOne({
      where: {
        name: RoleEnum.User
      }
    })

    // Crea varios usuarios de ejemplo
    const adminUsers: UserCreateDTO[] = [
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

    const generalUsers: UserCreateDTO[] = [
      {
        username: 'Rojaence1',
        password: await BcryptHash.genPasswordHash('user1234'),
        sessionActive: false,
        email: 'rojaence@example.com',
        status: true,
        firstName: 'Ronny',
        middleName: 'Jacinto',
        firstLastname: 'Endara',
        secondLastname: 'Celi',
        idCard: '0123569871',
        birthDate: new Date('1988-02-20'),
      }
    ];

    // Inserta los usuarios en la base de datos
    const adminUsersCreated = await User.bulkCreate(adminUsers, { validate: true });
    for (let admin of adminUsersCreated) {
      await RoleUser.create({
        idRole: adminRole!.id,
        idUser: admin.id
      })
    }

    const generalUsersCreated = await User.bulkCreate(generalUsers, { validate: true });
    for (let user of generalUsersCreated) {
      await RoleUser.create({
        idRole: userRole!.id,
        idUser: user.id
      })
    }
  
    console.log('Usuarios insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar usuarios:', error);
  }
  }
