import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
interface IPayload {
  sub: string;
}
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if(!token) {
    return res.send("Token not provided");
  }
  const [, hashToken] = token.split(" ");
  try {
    const { sub }  = verify(hashToken, process.env.SECRET_JWT) as IPayload;
    req.user_id = sub;
    return next()
  } catch (error) {
    return res.send("Token expired")
  }
}