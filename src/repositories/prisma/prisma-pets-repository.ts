import { prisma } from "@/lib/prisma";
import { Pet, Prisma } from "@prisma/client";
import { FindManyNearbyParams, PetsRepository } from "../pets-repository";

export class PrismaPetsRepository implements PetsRepository {
  async findById(petId: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    });

    return pet;
  }
  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const pets = await prisma.$queryRaw<Pet[]>`
        SELECT * FROM pets
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return pets;
  }
  async searchMany(query: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return pets;
  }
  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
}
