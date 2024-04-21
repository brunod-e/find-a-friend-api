import { FastifyInstance } from "fastify";
import { create } from "./create";
import { list } from "./list";
import { search } from "./search";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export const petsRoutes = async (app: FastifyInstance) => {
  app.post("/pets", { onRequest: [verifyJwt] }, create);
  app.get("/pets/", search);
  app.get("/pets/:id", list);
};
