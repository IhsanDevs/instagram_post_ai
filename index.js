import AI from "./AI.js";
import createPost from "./createPost.js";
import terminalImage from "terminal-image";
import fs from "fs";
import fetch from "node-fetch";
import sharp from "sharp";
import dotenv from "dotenv";
dotenv.config();
const ai = new AI();

const start = async () => {
  const prompt = await ai.generatePrompt().then((prompt) => {
    console.info(`Generated prompt: ${prompt}`);
    return prompt;
  });

  const caption = await ai.generateCaptionAbout(prompt).then((caption) => {
    // console.info(`Generated caption: ${caption}`);
    return caption;
  });

  const image = await ai.generateImageAbout(prompt).then((image) => {
    // console.info(`Generated image: ${image}`);
    return image;
  });

  const ImageBuffer = await fetch(image).then((res) =>
    res.arrayBuffer().then((buffer) => Buffer.from(buffer))
  );
  console.log(await terminalImage.buffer(ImageBuffer), caption);

  const filename = Date.now();
  await fs.promises.writeFile(`images/png/${filename}.png`, ImageBuffer);
  // change to jpeg
  await sharp(`images/png/${filename}.png`)
    .jpeg({
      quality: 100,
    })
    .toFile(`images/jpeg/${filename}.jpg`);

  const postPhotoToInstagram = await createPost(
    `./images/jpeg/${filename}.jpg`,
    caption
  );
  console.log(postPhotoToInstagram);
};

await start();
