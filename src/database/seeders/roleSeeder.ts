// scripts/seedUsers.ts
import { Role } from '@database/initDatabase';
import { database } from '@database/initDatabase';
import { RoleEnum } from '@enums/roleEnum';
import { RoleCreateDTO } from '@role/role.model';

export async function seedRoles() {
  try {
    await database.sequelize.authenticate();

    const roles: RoleCreateDTO[] = [
      {
        name: RoleEnum.Admin
      },
      {
        name: RoleEnum.User
      }
    ];

    await Role.bulkCreate(roles, { validate: true });
    console.log('Roles insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar Roles:', error);
  }
}
