import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";

import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateOrgServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateOrgServiceResponse {
  org: Org;
}

export class AuthenticateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgServiceRequest): Promise<AuthenticateOrgServiceResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doestPasswordMatches = await compare(password, org.password_hash);

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { org };
  }
}
