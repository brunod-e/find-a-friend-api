import { makeCreatePetService } from "@/services/factories/make-create-pet-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const create = async (req: FastifyRequest, reply: FastifyReply) => {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    independence_level: z.string(),
    environment: z.string(),
    photos: z.array(z.string()),
    requirements: z.string(),
  });

  const {
    name,
    description,
    age,
    energy_level,
    environment,
    independence_level,
    photos,
    requirements,
    size,
  } = createPetBodySchema.parse(req.body);

  const createService = makeCreatePetService();

  const newPet = await createService.execute({
    name,
    description,
    age,
    energy_level,
    environment,
    independence_level,
    photos,
    requirements,
    size,
  });

  return reply.status(201).send(newPet);
};
