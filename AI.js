import { OpenAIApi, Configuration } from "openai";

export default class AI {
  constructor() {
    // if API key is not set, throw error
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set");
    }

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.openai = new OpenAIApi(configuration);
  }

  async generatePrompt() {
    const prompt = `Generating the best DALL-E image requires careful consideration of several factors. Here are some tips to help you achieve the best results:
    Visualize your image: Take some time to visualize the image you want to create in your mind. Think about the colors, shapes, and textures that you want to include in your image.
    Use descriptive language: Once you have a clear image in your mind, use descriptive .
    Use descriptive and specific prompts: DALL-E works by generating images based on text prompts. To get the best results, it's important to use specific and descriptive language in your prompts. The more detailed your prompt is, the better the chance that DALL-E will generate an image that matches your vision.
    Experiment with different image sizes and aspect ratios: DALL-E can generate images in a variety of sizes and aspect ratios. Experimenting with different sizes and ratios can help you find the perfect image for your needs.
    Use a large number of tokens: When generating images with DALL-E, it's important to use a large number of tokens in your prompt. This will give the model more context to work with, which can lead to more accurate and detailed images.
    Fine-tune the model: DALL-E can be fine-tuned on specific datasets to improve its performance in generating certain types of images. If you have a specific type of image you want to generate, consider fine-tuning the model on a dataset of similar images to improve its performance.
    Be patient and experiment: Generating high-quality images with DALL-E can take time and experimentation. Be patient and willing to try different prompts, parameters, and techniques to get the best results.
    By following these tips and being persistent in your experimentation, you can generate stunning and unique images with DALL-E. Describe the Subject in Detail. Don’t Forget About the Background. Specify an Art Style, One of the best ways to get really good results is to use art styles in your prompts. This can be broad art styles or even specific artists and paintings. Set the Mood of the Scene You’re probably noticing a theme—be descriptive. That applies to more than the subject and background. It’s also important to describe the general mood you’re going for. Expand on Existing Photos, “Outpainting” is a feature that allows you to expand on existing photos in a number of ways. First, you can literally expand a photo by adding more to the frame.\nPrompt:`;
    const response = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 2,
      presence_penalty: 0.5,
    });
    return response.data.choices[0].text;
  }

  async generateCaptionAbout(prompt) {
    const response = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: `give me caption text from your opinion about the context in indonesian natural language for instagram post image from context art.\nAlso create hashtags about context. Use emoji for interesting and fun. Make hashtags to bottom with newline three dots.\n\nContext art:\n${prompt}\n\nCaption:\n`,
      temperature: 0.5,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 1.75,
      presence_penalty: 0.5,
    });
    return response.data.choices[0].text;
  }

  async generateImageAbout(prompt) {
    const response = await this.openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    return response.data.data[0].url;
  }
}
