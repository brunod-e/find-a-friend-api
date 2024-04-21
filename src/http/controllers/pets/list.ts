import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeGetPetService } from "@/services/factories/make-get-pet-service";

export const list = async (req: FastifyRequest, reply: FastifyReply) => {
  const getPetBodySchema = z.object({
    id: z.string(),
  });

  const { id } = getPetBodySchema.parse(req.params);

  const getPetService = makeGetPetService();

  try {
    const { pet } = await getPetService.execute({ id });

    return reply.status(200).send(pet);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    console.error(error);

    return reply.status(500).send({ message: "Internal server error" });
  }
};
