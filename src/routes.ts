import { Router } from "express";
import { AuthUserController } from "./controller/AuthUserController";

const router = Router();
router.post("/auth", new AuthUserController().handler);

export { router }