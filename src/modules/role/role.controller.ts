import { Request } from "express";
import { RoleService } from "./role.service";

export const GetController = async (req: Request) => {
  try {
    const response = await new RoleService().getRoles()
    return response
  } catch(error) {
    throw error
  }
}
