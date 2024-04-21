import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetService } from "../get-pet";

export function makeGetPetService(): GetPetService {
  const petsRepository = new PrismaPetsRepository();
  const getPetService = new GetPetService(petsRepository);

  return getPetService;
}
