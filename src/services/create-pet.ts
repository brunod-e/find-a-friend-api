import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface CreatePetServiceProps {
  name: string;
  description: string | null;
  age: string;
  size: string;
  energy_level: string;
  independence_level: string;
  environment: string;
  photos: string[];
  requirements: string;
}

interface CreatePetServiceResponse {
  pet: Pet;
}
export class CreatePetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    photos,
    requirements,
  }: CreatePetServiceProps): Promise<CreatePetServiceResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      energy_level,
      independence_level,
      environment,
      photos,
      requirements,
    });

    return { pet };
  }
}
