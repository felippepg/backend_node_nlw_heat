import { Router } from "express";
import { AuthUserController } from "./controller/AuthUserController";
import { CreateMessageControler } from "./controller/CreateMessageController";
import { authenticate } from "./middleware/authenticate";

const router = Router();
router.post("/auth", new AuthUserController().handler);
router.post("/message", authenticate, new CreateMessageControler().handler)
export { router }