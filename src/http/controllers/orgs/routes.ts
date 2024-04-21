import { FastifyInstance } from "fastify";
import { create } from "@/http/controllers/orgs/create";
import { authenticate } from "@/http/controllers/orgs/authenticate";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", create);
  app.post("/orgs/authenticate", authenticate);
}
