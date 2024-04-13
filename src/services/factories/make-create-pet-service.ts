import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetService } from "../create-pet";

export function makeCreatePetService(): CreatePetService {
  const petsRepository = new PrismaPetsRepository();
  const createPetService = new CreatePetService(petsRepository);

  return createPetService;
}
