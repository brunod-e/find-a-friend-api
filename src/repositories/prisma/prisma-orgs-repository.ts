import { prisma } from "@/lib/prisma";
import { Org, Prisma } from "@prisma/client";
import { FindManyNearbyParams, OrgsRepository } from "../orgs-repository";

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    });

    return org;
  }
  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    return org;
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Org[]>`
        SELECT * FROM gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }
}
