import { CodesHttpEnum } from "@enums/codesHttpEnums"
import RoleRepository from "./role.repository"
import { HttpResponse } from "@utils/httpResponse"

export class RoleService {
  private readonly _roleRepository: RoleRepository
  constructor() {
    this._roleRepository = new RoleRepository()
  }
  async getRoles() {
    let roles = await this._roleRepository.getRoles()
    return HttpResponse.response(CodesHttpEnum.ok, roles)
  }
}