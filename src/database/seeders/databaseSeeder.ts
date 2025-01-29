import { database } from "@database/initDatabase";
import { seedUsers } from "./userSeeder";
import { seedRoles } from "./roleSeeder";
import { seedPermissions } from "./permissionSeeder";
import { seedRolePermissions } from "./rolePermissionSeeder";

async function databaseSeeder() {
  await database.sequelize.authenticate()
  await database.sequelize.sync({ force: true })
  await seedRoles()
  await seedPermissions()
  await seedRolePermissions()
  await seedUsers()
  await database.sequelize.close()
}

databaseSeeder()