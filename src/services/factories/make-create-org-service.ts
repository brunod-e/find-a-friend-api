import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { CreateOrgService } from "../create-org";

export function makeCreateOrgService(): CreateOrgService {
  const orgsRepository = new PrismaOrgsRepository();
  const createOrgService = new CreateOrgService(orgsRepository);

  return createOrgService;
}
