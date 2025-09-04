import { GoogleGenAI } from "@google/genai";
import config from "../conf/conf";

const ai = new GoogleGenAI({
    apiKey:config.geminiAPIKey,
});

export  async function convertToMarkdown(content) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${content}`,
    config: {
        systemInstruction: `
        You are an AI Markdown Editor. 
        Follow these rules strictly:
        1. Do not change or remove original content/meaning.  
        2. Fix grammar and spelling errors.  
        3. Beautify content into clean Markdown.  
        4. Detect and format headings with #, ##, ### correctly.  
        5. Format any code as fenced code blocks (with correct language tag).  
        6. Preserve structure, only improve clarity and presentation.  
        7. Output only the beautified Markdown, no explanations.  
              `,
      },
  });
    return response.text
}

