import { Role } from "@database/initDatabase";
import { RoleScopes } from "./role.model";

export default class RoleRepository {
  async getRoles() {
    return Role.scope(RoleScopes.RoleWithPermissions).findAll()
  }
}
