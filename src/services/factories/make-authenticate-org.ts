import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateOrgService } from "../authenticate-org";

export function makeAuthenticateOrgService(): AuthenticateOrgService {
  const orgsRepository = new PrismaOrgsRepository();
  const authenticateOrgService = new AuthenticateOrgService(orgsRepository);

  return authenticateOrgService;
}
