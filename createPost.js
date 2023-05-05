import { IgApiClient } from "instagram-private-api";
import dotenv from "dotenv";
dotenv.config();

export default async function createPost(url, caption) {
  try {
    const ig = new IgApiClient();
    const { username, password } = {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    };

    // check if username and password are set
    if (!username || !password) {
      throw new Error("Username or password not set");
    }

    ig.state.generateDevice(username);
    const loggedInUser = await ig.account.login(username, password);
    console.log(loggedInUser);

    const publishResult = Promise.all([
      await ig.publish.photo({
        file: url,
        caption: caption,
      }),
    ])
      .then((result) => {
        console.info(`Published post: ${result}`);
        return result;
      })
      .catch((error) => {
        return error.message;
      });

    return publishResult;
  } catch (error) {
    return error.message;
  }
}
