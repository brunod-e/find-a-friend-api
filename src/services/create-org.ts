import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";
import { ResourceAlreadyExistsError } from "./errors/resource-already-exists-error";

interface CreateOrgServiceProps {
  name: string;
  email: string;
  cep: string;
  address: string;
  whatsapp: string;
  password: string;
  latitude: number;
  longitude: number;
}

interface CreateOrgServiceResponse {
  org: Org;
}
export class CreateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    cep,
    address,
    whatsapp,
    password,
    latitude,
    longitude,
  }: CreateOrgServiceProps): Promise<CreateOrgServiceResponse> {
    const orgByEmail = await this.orgsRepository.findByEmail(email);

    if (orgByEmail) throw new ResourceAlreadyExistsError();

    const password_hash = await hash(password, 8);

    const org = await this.orgsRepository.create({
      name,
      email,
      cep,
      address,
      whatsapp,
      password_hash,
      latitude,
      longitude,
    });

    return { org };
  }
}
