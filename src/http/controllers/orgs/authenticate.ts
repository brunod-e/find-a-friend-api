import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { makeAuthenticateOrgService } from "@/services/factories/make-authenticate-org";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const bodySchema = z.object({
    email: z.string(),
    password: z.string(),
  });
  const body = bodySchema.parse(request.body);

  const authenticateOrgUseCase = makeAuthenticateOrgService();

  try {
    const { org } = await authenticateOrgUseCase.execute(body);

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      }
    );

    return reply.status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
};
