// scripts/seedUsers.ts
import { Permission, Role, RolePermission } from '@database/initDatabase';
import { database } from '@database/initDatabase';
import { RoleEnum } from '@enums/roleEnum';
import { PermissionEnum } from '@enums/permissionEnum';
import { PermissionCreateDTO } from '@role/permission.model';

export async function seedPermissions() {
  try {
    // Conecta con la base de datos
    await database.sequelize.authenticate();

    // Crea varios usuarios de ejemplo
    const permissions: PermissionCreateDTO[] = [
      {
        name: PermissionEnum.CreateUser
      },
      {
        name: PermissionEnum.UpdatePassword
      },
      {
        name: PermissionEnum.UpdateProfile
      },
      {
        name: PermissionEnum.UpdateUser
      }
    ];

    await Permission.bulkCreate(permissions, { validate: true });

    console.log('Permisos insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar Permisos:', error);
  }
}
