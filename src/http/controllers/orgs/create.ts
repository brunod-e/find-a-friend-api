import { ResourceAlreadyExistsError } from "@/services/errors/resource-already-exists-error";
import { makeCreateOrgService } from "@/services/factories/make-create-org-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string(),
    whatsapp: z.string(),
    password: z.string(),
    cep: z.string(),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  });

  const body = bodySchema.parse(request.body);

  const createOrgUseCase = makeCreateOrgService();

  try {
    const { org } = await createOrgUseCase.execute(body);

    return reply.status(201).send(org);
  } catch (error) {
    if (error instanceof ResourceAlreadyExistsError) {
      return reply.status(400).send({ message: error.message });
    }
  }
};
