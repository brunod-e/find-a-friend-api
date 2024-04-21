import { FastifyInstance } from "fastify";
// import { verifyJwt } from "../../middlewares/verify-jwt";

import { create } from "./create";
import { list } from "./list";
import { search } from "./search";

export const petsRoutes = async (app: FastifyInstance) => {
  app.post("/pets", create);
  app.get("/pets/", search);
  app.get("/pets/:id", list);
  //   app.post("/sessions", authenticate);

  //   app.patch("/token/refresh", refresh);

  // Authenticated routes
  //   app.get("/me", { onRequest: [verifyJwt] }, profile);
};
