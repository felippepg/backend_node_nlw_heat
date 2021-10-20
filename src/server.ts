import { serverHttp } from "./app";

serverHttp.listen(4000, () => {
  console.log("app is running on port: 4000");
});