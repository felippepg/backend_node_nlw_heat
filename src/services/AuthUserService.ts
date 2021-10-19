import axios from "axios";

class AuthUserService {
  async execute(code: string) {
    const BASE_API = "https://github.com/login/oauth/access_token";
    const response = await axios.post(BASE_API, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID, 
        client_secret: process.env.GITHUB_CLIENT_SECRET, 
        code
      },
      headers: {
        "Accept": "application/json"
      }
    });
    return response.data;
  }
}

export { AuthUserService }