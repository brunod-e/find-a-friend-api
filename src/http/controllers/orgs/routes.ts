import { FastifyInstance } from "fastify";

import { create } from "@/http/controllers/orgs/create";
export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", create);
}
