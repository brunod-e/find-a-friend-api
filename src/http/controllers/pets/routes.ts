import { FastifyInstance } from "fastify";
// import { verifyJwt } from "../../middlewares/verify-jwt";

import { create } from "./create";

export const petsRoutes = async (app: FastifyInstance) => {
  app.post("/pets", create);
  //   app.post("/sessions", authenticate);

  //   app.patch("/token/refresh", refresh);

  // Authenticated routes
  //   app.get("/me", { onRequest: [verifyJwt] }, profile);
};
