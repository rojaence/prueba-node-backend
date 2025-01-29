// scripts/seedUsers.ts
import { Permission, Role, RolePermission } from '@database/initDatabase';
import { database } from '@database/initDatabase';
import { PermissionEnum } from '@enums/permissionEnum';
import { RoleEnum } from '@enums/roleEnum';
import { RolePermissionAttributes } from '@role/rolePermission.model';

export async function seedRolePermissions() {
  try {
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

    const updateUserPermission = await Permission.findOne({
      where: {
        name: PermissionEnum.UpdateUser
      }
    })

    const createUserPermission = await Permission.findOne({
      where: {
        name: PermissionEnum.CreateUser
      }
    })

    const updatePasswordPermission = await Permission.findOne({
      where: {
        name: PermissionEnum.UpdatePassword
      }
    })

    const updateProfilePermission = await Permission.findOne({
      where: {
        name: PermissionEnum.UpdateProfile
      }
    })

    const adminPermissions: RolePermissionAttributes[] = [
      {
        idRole: adminRole!.id,
        idPermission: createUserPermission!.id
      },
      {
        idRole: adminRole!.id,
        idPermission: updateUserPermission!.id
      },
      {
        idRole: adminRole!.id,
        idPermission: updateProfilePermission!.id
      },
      {
        idRole: adminRole!.id,
        idPermission: updatePasswordPermission!.id
      },
    ];

    const userPermissions: RolePermissionAttributes[] = [
      {
        idRole: userRole!.id,
        idPermission: updateProfilePermission!.id
      },
      {
        idRole: userRole!.id,
        idPermission: updatePasswordPermission!.id
      },
    ];

    await RolePermission.bulkCreate(adminPermissions, { validate: true });
    await RolePermission.bulkCreate(userPermissions, { validate: true });
    console.log('RolePermissions insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar RolePermissions:', error);
  }
}
