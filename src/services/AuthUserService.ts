import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken"
interface IAcessToken {
  access_token: string
}

interface IUserResponse {
  login: string,
  id: number,
  avatar_url: string,
  name: string
}

class AuthUserService {
  async execute(code: string) {
    const BASE_API = "https://github.com/login/oauth/access_token";
    const { data: accessTokenResponse } = await axios.post<IAcessToken>(BASE_API, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID, 
        client_secret: process.env.GITHUB_CLIENT_SECRET, 
        code
      },
      headers: {
        "Accept": "application/json"
      }
    });

    const response =  await axios.get<IUserResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`,
      },
    });

    const { name, login, id, avatar_url } = response.data;
    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id
      }
    });

    if(!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id, 
          login, 
          avatar_url, 
          name
        }
      });
    }

    const token = sign(
      { user },
      process.env.SECRET_JWT,
      { 
        subject: user.id,
        expiresIn: "1d"
      }
    )
    return { token, user};
  }
}

export { AuthUserService }