import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface SearchPetsServiceRequest {
  address: string;
  age?: string;
  size?: string;
  energy_level?: string;
  environment?: string;
}

interface SearchPetsServiceResponse {
  pets: Pet[];
}

export class SearchPetsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    address,
    age,
    size,
    energy_level,
    environment,
  }: SearchPetsServiceRequest): Promise<SearchPetsServiceResponse> {
    const pets = await this.petsRepository.findAll({
      address,
      age,
      size,
      energy_level,
      environment,
    });

    return { pets };
  }
}
