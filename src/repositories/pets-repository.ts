import { Pet, Prisma } from "@prisma/client";
export interface FindAllParams {
  address: string;
  age?: string;
  size?: string;
  energy_level?: string;
  environment?: string;
}

export interface PetsRepository {
  findById(userId: string): Promise<Pet | null>;
  findAll(params: FindAllParams): Promise<Pet[]>;
  create(data: Prisma.PetCreateInput): Promise<Pet>;
}
