import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessegeService";

class CreateMessageControler {
  async handler(request: Request, response: Response) {
    const { text } = request.body;
    const { user_id } = request;
    const createMessageService = new CreateMessageService();
    const result = await createMessageService.execute(text, user_id);
    response.json(result)
  }
}

export { CreateMessageControler }