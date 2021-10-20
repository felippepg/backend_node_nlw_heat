import { Request, Response } from "express";
import { GetThreeLastMessagesService }
  from "../services/GetThreeLastMessagesService";

class GetThreeLastMessagesController {
  async handler(request: Request, response: Response) {
    const getThreeLastMessagesService = new GetThreeLastMessagesService();
    const result = await getThreeLastMessagesService.execute();

    return response.json(result);
  }
}

export { GetThreeLastMessagesController }