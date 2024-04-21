import { makeSearchPetsService } from "@/services/factories/make-search-pets-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const search = async (request: FastifyRequest, reply: FastifyReply) => {
  const querySchema = z.object({
    address: z.string().min(1),
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    environment: z.string().optional(),
  });

  const { address, age, size, energy_level, environment } = querySchema.parse(
    request.query
  );

  const searchPetsService = makeSearchPetsService();

  try {
    const { pets } = await searchPetsService.execute({
      address,
      age,
      size,
      energy_level,
      environment,
    });

    return reply.status(200).send({ pets });
  } catch (error) {
    console.error(error);

    return reply.status(500).send({ message: "Internal server error" });
  }
};
