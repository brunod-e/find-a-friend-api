import { prisma } from "@/lib/prisma";
import { Pet, Prisma } from "@prisma/client";
import { FindAllParams, PetsRepository } from "../pets-repository";

export class PrismaPetsRepository implements PetsRepository {
  async findAll(params: FindAllParams): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        energy_level: params.energy_level,
        org: {
          address: {
            contains: params.address,
            mode: "insensitive",
          },
        },
      },
    });

    return pets;
  }

  async findById(petId: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    });

    return pet;
  }

  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
}
