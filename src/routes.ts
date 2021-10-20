import { Router } from "express";
import { AuthUserController } from "./controller/AuthUserController";
import { CreateMessageControler } from "./controller/CreateMessageController";
import { GetThreeLastMessagesController } from "./controller/GetThreeLastMessagesController";
import { authenticate } from "./middleware/authenticate";
import { Request, Response } from "express";
import { GetProfileUserController } from "./controller/GetProfileUserController";


const router = Router();
router.post("/auth", new AuthUserController().handler);
router.post("/message", authenticate, new CreateMessageControler().handler);
router.get("/messages/last3", new GetThreeLastMessagesController().handler);
router.get("/user", authenticate, new GetProfileUserController().handler);

export { router }