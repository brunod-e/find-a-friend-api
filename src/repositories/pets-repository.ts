import { Pet, Prisma } from "@prisma/client";

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface PetsRepository {
  findById(userId: string): Promise<Pet | null>;
  searchMany(query: string, page: number): Promise<Pet[]>;
  findManyNearby(params: FindManyNearbyParams): Promise<Pet[]>;
  create(data: Prisma.PetCreateInput): Promise<Pet>;
}
