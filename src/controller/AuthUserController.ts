import { Request, Response } from "express";
import { AuthUserService } from "../services/AuthUserService";

class AuthUserController {
  async handler(request: Request, response: Response) {
    const { code } = request.body;
    const authUserService = new AuthUserService();
    const result = await authUserService.execute(code);

    return response.json(result);
  }
}

export { AuthUserController }