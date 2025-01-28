import { database } from "@database/initDatabase";
import { seedUsers } from "./userSeeder";

async function databaseSeeder() {
  await database.sequelize.sync({ force: true })
  await seedUsers()
}

databaseSeeder()